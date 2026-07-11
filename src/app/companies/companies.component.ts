import { Component, OnDestroy, OnInit } from '@angular/core';
import { BarberService } from '../services/barber.service';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { TranslatePipe } from '../pipes/translate.pipe';
import { getShopProfile } from '../data/demo-barbershops';

@Component({
  selector: 'app-companies',
  imports: [CommonModule, RouterLink, NgIf, NgFor, TranslatePipe],
  templateUrl: './companies.component.html',
  styleUrl: './companies.component.css'
})
export class CompaniesComponent implements OnInit, OnDestroy {
  companies: any[] = [];
  filteredCompaniesByOwnerId: any[] = [];
  isLoggedIn = false;
  isAdmin = false;
  isOwner = false;
  private hoverTimers = new Map<string, ReturnType<typeof setInterval>>();

  constructor(
    private barberService: BarberService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.isLoggedin$.subscribe((status) => {
      this.isLoggedIn = status;
    });
    this.isAdmin = this.authService.isAdmin();
    this.isOwner = this.authService.isOwner();

    this.barberService.getAllCompanies().subscribe({
      next: (data) => {
        this.companies = data.map((company) => {
          const profile = getShopProfile(company.companyName);
          return {
            ...company,
            ...profile,
            imageUrl: profile.gallery,
            currentImageIndex: 0,
            description: profile.shortDescription
          };
        });

        if (this.authService.isOwner()) {
          const id = this.checkOwner();
          this.filteredCompaniesByOwnerId = this.companies.filter(
            (company) => company.companyId === id
          );
        }
      },
      error: (err) => {
        console.error('Greška prilikom dohvatanja kompanija', err);
      }
    });
  }

  ngOnDestroy(): void {
    this.hoverTimers.forEach((timer) => clearInterval(timer));
    this.hoverTimers.clear();
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
}
