import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BarberService } from '../services/barber.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { CreateCompanyOwnerComponent } from '../auth/create-company-owner/create-company-owner.component';
import { Subscription } from 'rxjs/internal/Subscription';
import { TranslatePipe } from '../pipes/translate.pipe';
import {
  enrichBarberProfile,
  formatHours,
  getShopProfile,
  ShopProfile
} from '../data/demo-barbershops';

@Component({
  selector: 'app-company-barbers',
  imports: [CommonModule, RouterLink, FormsModule, CreateCompanyOwnerComponent, TranslatePipe],
  templateUrl: './company-barbers.component.html',
  styleUrl: './company-barbers.component.css'
})
export class CompanyBarbersComponent implements OnInit {
  check = false;
  selectedAppointment: string | null = null;
  companyId: string | null = null;
  barbers: any[] = [];
  haircuts: any[] = [];
  selectedBarberId: string | null = null;
  selectedDate: any = new Date().toISOString().split('T')[0];
  today = '';
  company: any;
  profile: ShopProfile | null = null;
  activeGalleryIndex = 0;
  selectedOwner = '';
  owners: any[] = [];
  freeAppointments: any[] = [];
  firstName = '';
  lastName = '';
  email = '';
  phoneNumber = '';
  selectedHaircut = '';
  isLoggedIn = false;
  isAdmin = false;
  isOwner = false;
  isBooking = false;
  bookingFeedback = '';
  bookingFeedbackIsError = false;
  routeSubscription: Subscription | undefined;
  currentEntityId: string | null = null;

  constructor(
    private barberService: BarberService,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.routeSubscription = this.route.paramMap.subscribe((params) => {
      this.currentEntityId = params.get('id');
    });

    this.companyId = this.route.snapshot.paramMap.get('id');

    if (this.companyId) {
      this.authService.checkIfCompanyOwnerExists(this.companyId).subscribe({
        next: (res) => {
          this.check = res;
        }
      });
    }

    this.authService.isLoggedin$.subscribe((status) => {
      this.isLoggedIn = status;
    });

    this.isAdmin = this.authService.isAdmin();
    this.isOwner = this.authService.isOwner();
    this.today = new Date().toISOString().split('T')[0];

    this.authService.getOwners().subscribe({
      next: (res) => {
        this.owners = res;
      }
    });

    if (!this.companyId) {
      return;
    }

    this.barberService.getAllBarbersByCompanyId(this.companyId).subscribe({
      next: (data) => {
        const companyName = this.company?.companyName ?? '';
        this.barbers = data.map((barber: any, index: number) => {
          const enrichment = enrichBarberProfile(companyName || barber.companyName || 'shop', barber.barberName, index);
          return {
            ...barber,
            ...enrichment,
            hoursLabel: formatHours(barber.individualStartTime, barber.individualEndTime)
          };
        });
      },
      error: (err) => console.error(err)
    });

    this.barberService.getCompanyDetailsById(this.companyId).subscribe({
      next: (data) => {
        this.profile = getShopProfile(data.companyName);
        this.company = {
          ...data,
          imageUrl: this.profile.gallery,
          ...this.profile
        };

        this.barbers = this.barbers.map((barber: any, index: number) => {
          const enrichment = enrichBarberProfile(data.companyName, barber.barberName, index);
          return {
            ...barber,
            ...enrichment,
            hoursLabel: formatHours(barber.individualStartTime, barber.individualEndTime)
          };
        });
      },
      error: (err) => console.error(err)
    });

    this.barberService.getAllHaircutsByCompanyId(this.companyId).subscribe({
      next: (data) => {
        this.haircuts = data;
        if (this.haircuts.length > 0) {
          this.selectedHaircut = this.haircuts[0].haircutId;
        }
      },
      error: (err) => console.log(err)
    });
  }

  get selectedBarber(): any | null {
    return this.barbers.find((barber) => barber.barberId === this.selectedBarberId) ?? null;
  }

  setGallery(index: number): void {
    this.activeGalleryIndex = index;
  }

  nextGallery(): void {
    if (!this.company?.imageUrl?.length) {
      return;
    }
    this.activeGalleryIndex = (this.activeGalleryIndex + 1) % this.company.imageUrl.length;
  }

  prevGallery(): void {
    if (!this.company?.imageUrl?.length) {
      return;
    }
    this.activeGalleryIndex =
      (this.activeGalleryIndex - 1 + this.company.imageUrl.length) % this.company.imageUrl.length;
  }

  onSubmitSelectedOwner(): void {
    // Owner assignment wiring remains available for admin flows.
  }

  onHaircutChange(haircutId: string): void {
    this.selectedHaircut = haircutId;
  }

  onOwnerSelected(ownerId: string): string {
    this.selectedOwner = ownerId;
    return this.selectedOwner;
  }

  onBarberClick(barberId: string): void {
    this.selectedBarberId = barberId;
    this.selectedAppointment = null;
    this.bookingFeedback = '';
    if (this.isLoggedIn) {
      this.loadAppointments();
    } else {
      this.freeAppointments = [];
    }
    setTimeout(() => {
      document.getElementById('booking-panel')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  }

  onPhoneChange(value: string): void {
    this.phoneNumber = (value || '').replace(/\D/g, '');
  }

  onDateChange(): void {
    if (this.selectedBarberId) {
      this.loadAppointments();
    }
  }

  onDatePick(date: string): void {
    this.selectedAppointment = date;
  }

  loadAppointments(): void {
    this.bookingFeedback = '';
    const dateValue =
      typeof this.selectedDate === 'string' ? new Date(this.selectedDate) : this.selectedDate;

    this.barberService.getAllFreeAppointmentsByBarberId(dateValue, this.selectedBarberId!).subscribe({
      next: (data) => {
        this.freeAppointments = data ?? [];
      },
      error: (err) => {
        this.freeAppointments = [];
        this.showBookingError(this.extractError(err) || 'Ne mogu da učitam termine.');
      }
    });
  }

  onSubmit(): void {
    this.bookingFeedback = '';
    this.bookingFeedbackIsError = false;

    if (!this.selectedAppointment) {
      this.showBookingError('Izaberite termin.');
      return;
    }
    if (!this.firstName.trim() || !this.lastName.trim() || !this.email.trim() || !this.phoneNumber.trim()) {
      this.showBookingError('Popunite ime, prezime, email i telefon.');
      return;
    }
    if (!this.selectedHaircut) {
      this.showBookingError('Izaberite uslugu.');
      return;
    }
    if (!this.selectedBarberId || this.isBooking) {
      return;
    }

    this.isBooking = true;
    const formData = new FormData();
    formData.append('Schedule.firstName', this.firstName.trim());
    formData.append('Schedule.lastName', this.lastName.trim());
    formData.append('Schedule.email', this.email.trim());
    formData.append('Schedule.phoneNumber', this.phoneNumber.trim());
    formData.append('Schedule.haircutId', this.selectedHaircut);
    formData.append('Schedule.time', this.selectedAppointment);
    formData.append('Schedule.barberId', this.selectedBarberId);

    this.barberService.createSchedule(formData).subscribe({
      next: (response) => {
        this.isBooking = false;
        this.bookingFeedbackIsError = false;
        this.bookingFeedback =
          response?.message ||
          `Uspešno zakazano${response?.haircutName ? ': ' + response.haircutName : ''}. Proverite email za potvrdu.`;
        this.selectedAppointment = null;
        this.loadAppointments();
      },
      error: (error) => {
        this.isBooking = false;
        this.showBookingError(this.extractError(error));
      }
    });
  }

  private showBookingError(message: string): void {
    this.bookingFeedbackIsError = true;
    this.bookingFeedback = message;
  }

  private extractError(error: any): string {
    if (error?.status === 0) {
      return 'API nije dostupan. Proverite da li backend radi.';
    }

    if (error?.error?.errors) {
      const validationErrors = error.error.errors;
      const messages: string[] = [];
      for (const field of Object.keys(validationErrors)) {
        messages.push(...validationErrors[field]);
      }
      if (messages.length) {
        return messages.join('\n');
      }
    }

    const detail = error?.error?.detail || error?.error?.title || error?.error?.message;
    if (typeof detail === 'string' && detail.trim()) {
      return detail;
    }

    return 'Zakazivanje nije uspelo. Proverite podatke i pokušajte ponovo.';
  }
}
