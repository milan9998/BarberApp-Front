import { Component, OnDestroy, OnInit } from '@angular/core';
import { BarberService } from '../services/barber.service';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { TranslatePipe } from '../pipes/translate.pipe';
import { getShopProfile } from '../data/demo-barbershops';
import { I18nService } from '../services/i18n.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-companies',
  imports: [CommonModule, RouterLink, NgIf, NgFor, TranslatePipe],
  templateUrl: './companies.component.html',
  styleUrl: './companies.component.css'
})
export class CompaniesComponent implements OnInit, OnDestroy {
  companies: any[] = [];
  private rawCompanies: any[] = [];
  filteredCompaniesByOwnerId: any[] = [];
  isLoggedIn = false;
  isAdmin = false;
  isOwner = false;
  isLoading = true;
  loadError = false;
  private hoverTimers = new Map<string, ReturnType<typeof setInterval>>();
  private langSub?: Subscription;

  constructor(
    private barberService: BarberService,
    private authService: AuthService,
    private i18n: I18nService
  ) {}

  ngOnInit(): void {
    this.authService.isLoggedin$.subscribe((status) => {
      this.isLoggedIn = status;
    });
    this.isAdmin = this.authService.isAdmin();
    this.isOwner = this.authService.isOwner();

    this.langSub = this.i18n.language$.subscribe(() => {
      if (this.rawCompanies.length) {
        this.applyProfiles();
      }
    });

    this.barberService.getAllCompanies().subscribe({
      next: (data) => {
        this.rawCompanies = Array.isArray(data) ? data : (data as any)?.data || [];
        this.isLoading = false;
        this.loadError = false;
        this.applyProfiles();
      },
      error: (err) => {
        console.error('Greška prilikom dohvatanja kompanija', err);
        this.isLoading = false;
        this.loadError = true;
        this.companies = [];
        this.rawCompanies = [];
      }
    });
  }

  ngOnDestroy(): void {
    this.hoverTimers.forEach((timer) => clearInterval(timer));
    this.hoverTimers.clear();
    this.langSub?.unsubscribe();
  }

  private applyProfiles(): void {
    const lang = this.i18n.language;
    this.companies = (this.rawCompanies || []).map((company) => {
      const profile = getShopProfile(company.companyName, lang);
      return {
        ...company,
        ...profile,
        companyId: company.companyId || company.CompanyId || company.id,
        imageUrl:
          Array.isArray(profile.gallery) && profile.gallery.length
            ? profile.gallery
            : Array.isArray(company.imageUrl)
              ? company.imageUrl
              : [],
        currentImageIndex: company.currentImageIndex ?? 0,
        description: profile.shortDescription
      };
    });

    // Owners still see the full marketplace on mobile/desktop.
    // Filtering to one shop made the list look "broken".
    this.filteredCompaniesByOwnerId = [];
  }

  checkOwner(): string {
    if (this.authService.isOwner()) {
      return this.authService.getOwnerCompanyId() || '';
    }
    return '';
  }

  onCardEnter(company: any): void {
    if (!company.imageUrl || company.imageUrl.length <= 1) {
      return;
    }

    this.onCardLeave(company);
    const timer = setInterval(() => {
      company.currentImageIndex = (company.currentImageIndex + 1) % company.imageUrl.length;
    }, 1600);
    this.hoverTimers.set(company.companyId, timer);
  }

  onCardLeave(company: any): void {
    const timer = this.hoverTimers.get(company.companyId);
    if (timer) {
      clearInterval(timer);
      this.hoverTimers.delete(company.companyId);
    }
  }

  onImageError(company: any): void {
    const images = company?.imageUrl;
    if (!Array.isArray(images) || !images.length) {
      return;
    }
    const failed = new Set<number>(company._failedImageIndexes || []);
    failed.add(company.currentImageIndex || 0);
    company._failedImageIndexes = [...failed];
    for (let offset = 1; offset < images.length; offset++) {
      const next = ((company.currentImageIndex || 0) + offset) % images.length;
      if (!failed.has(next)) {
        company.currentImageIndex = next;
        return;
      }
    }
  }
}
