import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslatePipe } from '../pipes/translate.pipe';
import { BarberService } from '../services/barber.service';
import { CompanyConfigModel } from '../models/company.config';
import { getShopProfile } from '../data/demo-barbershops';
import { I18nService } from '../services/i18n.service';
import { Subscription } from 'rxjs';

interface HeroCompany {
  companyId: string;
  companyName: string;
  imageUrl: string[];
  description: string;
  location: string;
  tag: string;
}

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterModule, TranslatePipe],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  featuredCompanies: HeroCompany[] = [];
  activeCompanyIndex = 0;
  heroAnimKey = 0;
  private companyIntervalId: ReturnType<typeof setInterval> | null = null;
  private rawCompanies: CompanyConfigModel[] = [];
  private langSub?: Subscription;

  private readonly popularCompanyNames = [
    'Truefitt & Hill',
    'Schorem Barbier',
    'Pall Mall Barbers'
  ];

  constructor(
    private barberService: BarberService,
    private i18n: I18nService
  ) {}

  ngOnInit(): void {
    this.langSub = this.i18n.language$.subscribe(() => {
      if (this.rawCompanies.length) {
        this.buildFeatured();
      }
    });

    this.barberService.getAllCompanies().subscribe({
      next: (companies) => {
        this.rawCompanies = companies;
        this.buildFeatured();
        this.startAutoplay();
      },
      error: () => {
        this.featuredCompanies = [];
      }
    });
  }

  ngOnDestroy(): void {
    this.clearIntervals();
    this.langSub?.unsubscribe();
  }

  get activeCompany(): HeroCompany | null {
    return this.featuredCompanies[this.activeCompanyIndex] ?? null;
  }

  get heroImage(): string {
    return (
      this.activeCompany?.imageUrl?.[0] ??
      'https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=1800&q=80'
    );
  }

  setCompany(index: number): void {
    if (index === this.activeCompanyIndex) {
      return;
    }
    this.activeCompanyIndex = index;
    this.heroAnimKey += 1;
    this.startAutoplay();
  }

  private buildFeatured(): void {
    const lang = this.i18n.language;
    const normalized = this.rawCompanies.map((company) => {
      const profile = getShopProfile(company.companyName, lang);
      return {
        companyId: company.companyId,
        companyName: company.companyName,
        imageUrl: profile.gallery,
        description: profile.shortDescription,
        location: profile.location,
        tag: profile.tag
      };
    });

    const featured = this.popularCompanyNames
      .map((name) => normalized.find((company) => company.companyName === name))
      .filter((company): company is HeroCompany => Boolean(company))
      .slice(0, 3);

    this.featuredCompanies = featured.length > 0 ? featured : normalized.slice(0, 3);
  }

  private startAutoplay(): void {
    if (this.featuredCompanies.length === 0) {
      return;
    }

    this.clearIntervals();
    this.companyIntervalId = setInterval(() => {
      this.activeCompanyIndex = (this.activeCompanyIndex + 1) % this.featuredCompanies.length;
      this.heroAnimKey += 1;
    }, 5500);
  }

  private clearIntervals(): void {
    if (this.companyIntervalId) {
      clearInterval(this.companyIntervalId);
      this.companyIntervalId = null;
    }
  }
}
