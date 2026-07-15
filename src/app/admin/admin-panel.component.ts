import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { forkJoin, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { BarberService } from '../services/barber.service';
import { TranslatePipe } from '../pipes/translate.pipe';
import { getShopProfile } from '../data/demo-barbershops';
import { I18nService } from '../services/i18n.service';

interface AdminShopRow {
  companyId: string;
  companyName: string;
  location: string;
  tag: string;
  barbers: Array<{ barberId: string; barberName: string; email: string; phoneNumber: string; hours: string }>;
  loadingBarbers: boolean;
  expanded: boolean;
}

@Component({
  selector: 'app-admin-panel',
  imports: [CommonModule, RouterLink, TranslatePipe],
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.css'
})
export class AdminPanelComponent implements OnInit {
  shops: AdminShopRow[] = [];
  isLoading = true;
  loadError = false;

  constructor(
    private barberService: BarberService,
    private i18n: I18nService
  ) {}

  ngOnInit(): void {
    this.barberService.getAllCompanies().subscribe({
      next: (companies) => {
        const lang = this.i18n.language;
        this.shops = (companies || []).map((company: any) => {
          const profile = getShopProfile(company.companyName, lang);
          return {
            companyId: company.companyId,
            companyName: company.companyName,
            location: profile.location,
            tag: profile.tag,
            barbers: [],
            loadingBarbers: false,
            expanded: false
          };
        });
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
        this.loadError = true;
      }
    });
  }

  toggleShop(shop: AdminShopRow): void {
    shop.expanded = !shop.expanded;
    if (shop.expanded && !shop.barbers.length && !shop.loadingBarbers) {
      this.loadBarbers(shop);
    }
  }

  loadAllBarbers(): void {
    const requests = this.shops.map((shop) => {
      shop.loadingBarbers = true;
      return this.barberService.getAllBarbersByCompanyId(shop.companyId).pipe(
        map((barbers) => ({ shop, barbers: barbers || [] })),
        catchError(() => of({ shop, barbers: [] as any[] }))
      );
    });

    forkJoin(requests).subscribe((results) => {
      results.forEach(({ shop, barbers }) => {
        shop.barbers = barbers.map((b: any) => ({
          barberId: b.barberId,
          barberName: b.barberName,
          email: b.email,
          phoneNumber: b.phoneNumber,
          hours: `${(b.individualStartTime || '').toString().slice(0, 5)} – ${(b.individualEndTime || '').toString().slice(0, 5)}`
        }));
        shop.loadingBarbers = false;
        shop.expanded = true;
      });
    });
  }

  private loadBarbers(shop: AdminShopRow): void {
    shop.loadingBarbers = true;
    this.barberService.getAllBarbersByCompanyId(shop.companyId).subscribe({
      next: (barbers) => {
        shop.barbers = (barbers || []).map((b: any) => ({
          barberId: b.barberId,
          barberName: b.barberName,
          email: b.email,
          phoneNumber: b.phoneNumber,
          hours: `${(b.individualStartTime || '').toString().slice(0, 5)} – ${(b.individualEndTime || '').toString().slice(0, 5)}`
        }));
        shop.loadingBarbers = false;
      },
      error: () => {
        shop.barbers = [];
        shop.loadingBarbers = false;
      }
    });
  }
}
