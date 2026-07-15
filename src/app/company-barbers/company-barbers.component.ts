import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { BarberService } from '../services/barber.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { CreateCompanyOwnerComponent } from '../auth/create-company-owner/create-company-owner.component';
import { Subscription } from 'rxjs/internal/Subscription';
import { TranslatePipe } from '../pipes/translate.pipe';
import { I18nService } from '../services/i18n.service';
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
export class CompanyBarbersComponent implements OnInit, OnDestroy {
  check = false;
  selectedAppointment: string | null = null;
  companyId: string | null = null;
  barbers: any[] = [];
  private rawBarbers: any[] = [];
  haircuts: any[] = [];
  selectedBarberId: string | null = null;
  selectedDate: any = new Date().toISOString().split('T')[0];
  today = '';
  company: any;
  private rawCompany: any = null;
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
  companyLoadError = false;
  barbersLoaded = false;
  haircutsLoaded = false;
  routeSubscription: Subscription | undefined;
  private langSub?: Subscription;
  currentEntityId: string | null = null;

  constructor(
    private barberService: BarberService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private i18n: I18nService
  ) {}

  ngOnInit(): void {
    this.routeSubscription = this.route.paramMap.subscribe((params) => {
      this.currentEntityId = params.get('id');
    });

    this.companyId = this.route.snapshot.paramMap.get('id');

    this.langSub = this.i18n.language$.subscribe(() => {
      this.applyLocalizedContent();
    });

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
        this.rawBarbers = data ?? [];
        this.barbersLoaded = true;
        this.applyLocalizedContent();
      },
      error: (err) => {
        console.error(err);
        this.rawBarbers = [];
        this.barbers = [];
        this.barbersLoaded = true;
      }
    });

    this.barberService.getCompanyDetailsById(this.companyId).subscribe({
      next: (data) => {
        this.rawCompany = data;
        this.companyLoadError = false;
        this.applyLocalizedContent();
      },
      error: (err) => {
        console.error(err);
        this.companyLoadError = true;
      }
    });

    this.barberService.getAllHaircutsByCompanyId(this.companyId).subscribe({
      next: (data) => {
        this.haircuts = data ?? [];
        this.haircutsLoaded = true;
        if (this.haircuts.length > 0) {
          this.selectedHaircut = this.haircuts[0].haircutId;
        }
      },
      error: (err) => {
        console.log(err);
        this.haircuts = [];
        this.haircutsLoaded = true;
      }
    });
  }

  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
    this.langSub?.unsubscribe();
  }

  private applyLocalizedContent(): void {
    const lang = this.i18n.language;
    const companyName = this.rawCompany?.companyName ?? this.company?.companyName ?? 'shop';

    if (this.rawCompany) {
      this.profile = getShopProfile(this.rawCompany.companyName, lang);
      this.company = {
        ...this.rawCompany,
        imageUrl: this.profile.gallery,
        ...this.profile
      };
    }

    if (this.rawBarbers.length) {
      this.barbers = this.rawBarbers.map((barber: any, index: number) => {
        const enrichment = enrichBarberProfile(
          companyName || barber.companyName || 'shop',
          barber.barberName,
          index,
          lang
        );
        return {
          ...barber,
          ...enrichment,
          hoursLabel: formatHours(barber.individualStartTime, barber.individualEndTime)
        };
      });
    }
  }

  get selectedBarber(): any | null {
    return this.barbers.find((barber) => barber.barberId === this.selectedBarberId) ?? null;
  }

  setGallery(index: number): void {
    this.activeGalleryIndex = index;
  }

  onGalleryImageError(index: number): void {
    const images = this.company?.imageUrl;
    if (!Array.isArray(images) || images.length < 2) {
      return;
    }
    const next = (index + 1) % images.length;
    if (next !== index) {
      images[index] = images[next];
      if (this.activeGalleryIndex === index) {
        this.activeGalleryIndex = next;
      }
    }
  }

  scrollToSection(sectionId: string): void {
    const el = document.getElementById(sectionId);
    if (!el) {
      return;
    }
    const offset = 88;
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
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
    setTimeout(() => this.scrollToSection('booking-panel'), 50);
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
        this.showBookingError(this.extractError(err) || this.i18n.t('company.loadSlotsFailed'));
      }
    });
  }

  onSubmit(): void {
    this.bookingFeedback = '';
    this.bookingFeedbackIsError = false;

    if (!this.selectedAppointment) {
      this.showBookingError(this.i18n.t('company.selectSlot'));
      return;
    }
    if (!this.firstName.trim() || !this.lastName.trim() || !this.email.trim() || !this.phoneNumber.trim()) {
      this.showBookingError(this.i18n.t('company.fillBookingFields'));
      return;
    }
    if (!this.selectedHaircut) {
      this.showBookingError(this.i18n.t('company.selectService'));
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
        const servicePart = response?.haircutName ? `: ${response.haircutName}` : '';
        this.bookingFeedback =
          `${this.i18n.t('company.bookingSuccess')}${servicePart}. ${this.i18n.t('company.bookingSuccessEmail')}`;
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
      return this.i18n.t('company.apiUnavailable');
    }

    if (error?.error?.errors) {
      const validationErrors = error.error.errors;
      const messages: string[] = [];
      for (const field of Object.keys(validationErrors)) {
        messages.push(...validationErrors[field]);
      }
      if (messages.length) {
        return messages.map((m: string) => this.i18n.localizeMessage(m)).join('\n');
      }
    }

    const detail = error?.error?.detail || error?.error?.title || error?.error?.message;
    if (typeof detail === 'string' && detail.trim()) {
      return this.i18n.localizeMessage(detail, 'company.bookingFailed');
    }

    return this.i18n.t('company.bookingFailed');
  }
}
