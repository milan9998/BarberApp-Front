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
    this.loadAppointments();
    setTimeout(() => {
      document.getElementById('booking-panel')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
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
    const dateValue =
      typeof this.selectedDate === 'string' ? new Date(this.selectedDate) : this.selectedDate;

    this.barberService.getAllFreeAppointmentsByBarberId(dateValue, this.selectedBarberId!).subscribe({
      next: (data) => {
        this.freeAppointments = data;
      },
      error: (err) => console.error(err)
    });
  }

  onSubmit(): void {
    const formData = new FormData();
    formData.append('Schedule.firstName', this.firstName);
    formData.append('Schedule.lastName', this.lastName);
    formData.append('Schedule.email', this.email);
    formData.append('Schedule.phoneNumber', this.phoneNumber);
    formData.append('Schedule.haircutId', this.selectedHaircut);
    formData.append('Schedule.time', this.selectedAppointment!);

    if (this.selectedBarberId) {
      formData.append('Schedule.barberId', this.selectedBarberId);
    }

    this.barberService.createSchedule(formData).subscribe({
      next: (response) => console.log('Uspešno zakazano:', response),
      error: (error) => console.error('Greška prilikom zakazivanja:', error)
    });
  }
}
