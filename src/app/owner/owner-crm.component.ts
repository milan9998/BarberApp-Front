import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { forkJoin, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { BarberService } from '../services/barber.service';
import { TranslatePipe } from '../pipes/translate.pipe';
import { I18nService } from '../services/i18n.service';

interface BarberStat {
  barberId: string;
  barberName: string;
  email: string;
  phoneNumber: string;
  total: number;
  upcoming: number;
  completed: number;
}

interface MonthStat {
  year: number;
  month: number;
  count: number;
}

interface RecentBooking {
  appointmentId: string;
  barberId: string;
  barberName: string;
  time: string | Date;
  haircutName: string;
  isUpcoming: boolean;
}

@Component({
  selector: 'app-owner-crm',
  imports: [CommonModule, RouterLink, TranslatePipe],
  templateUrl: './owner-crm.component.html',
  styleUrl: './owner-crm.component.css'
})
export class OwnerCrmComponent implements OnInit {
  companyId = '';
  companyName = '';
  isLoading = true;
  loadError = false;

  totalAppointments = 0;
  upcomingAppointments = 0;
  completedAppointments = 0;
  barberCount = 0;
  perBarber: BarberStat[] = [];
  byMonth: MonthStat[] = [];
  recent: RecentBooking[] = [];
  maxBarberTotal = 1;
  maxMonthCount = 1;

  constructor(
    private route: ActivatedRoute,
    private barberService: BarberService,
    private authService: AuthService,
    private i18n: I18nService
  ) {}

  ngOnInit(): void {
    this.companyId =
      this.route.snapshot.paramMap.get('companyId') ||
      this.authService.getOwnerCompanyId() ||
      '';

    if (!this.companyId) {
      this.isLoading = false;
      this.loadError = true;
      return;
    }

    this.barberService.getCompanyDetailsById(this.companyId).subscribe({
      next: (company) => {
        this.companyName = company?.companyName || '';
      },
      error: () => {
        this.companyName = '';
      }
    });

    this.barberService.getCompanyCrm(this.companyId).subscribe({
      next: (data) => this.applyCrm(data),
      error: () => this.loadCrmFallback()
    });
  }

  monthLabel(stat: MonthStat): string {
    const date = new Date(stat.year, stat.month - 1, 1);
    return date.toLocaleString(this.i18n.language === 'sr' ? 'sr-RS' : 'en-US', {
      month: 'short'
    });
  }

  barWidth(value: number, max: number): string {
    if (!max) {
      return '0%';
    }
    return `${Math.max(8, Math.round((value / max) * 100))}%`;
  }

  private applyCrm(data: any): void {
    this.totalAppointments = data?.totalAppointments || 0;
    this.upcomingAppointments = data?.upcomingAppointments || 0;
    this.completedAppointments = data?.completedAppointments || 0;
    this.barberCount = data?.barberCount || 0;
    this.perBarber = data?.perBarber || [];
    this.byMonth = data?.byMonth || [];
    this.recent = data?.recent || [];
    this.maxBarberTotal = Math.max(1, ...this.perBarber.map((b) => b.total));
    this.maxMonthCount = Math.max(1, ...this.byMonth.map((m) => m.count));
    this.isLoading = false;
    this.loadError = false;
  }

  private loadCrmFallback(): void {
    this.barberService.getAllBarbersByCompanyId(this.companyId).subscribe({
      next: (barbers) => {
        const list = barbers || [];
        if (!list.length) {
          this.applyCrm({
            totalAppointments: 0,
            upcomingAppointments: 0,
            completedAppointments: 0,
            barberCount: 0,
            perBarber: [],
            byMonth: this.emptyMonths(),
            recent: []
          });
          return;
        }

        const now = Date.now();
        const requests = list.map((barber: any) =>
          this.barberService.getUsedAppointmentsByBarberId(barber.barberId).pipe(
            map((appts) => ({ barber, appts: appts || [] })),
            catchError(() => of({ barber, appts: [] as any[] }))
          )
        );

        forkJoin(requests).subscribe((results) => {
          const perBarber: BarberStat[] = [];
          const recent: RecentBooking[] = [];
          const allTimes: Date[] = [];

          results.forEach(({ barber, appts }) => {
            const upcoming = appts.filter((a) => new Date(a.time).getTime() >= now).length;
            perBarber.push({
              barberId: barber.barberId,
              barberName: barber.barberName,
              email: barber.email,
              phoneNumber: barber.phoneNumber,
              total: appts.length,
              upcoming,
              completed: appts.length - upcoming
            });

            appts.forEach((a: any) => {
              const t = new Date(a.time);
              allTimes.push(t);
              recent.push({
                appointmentId: a.appointmentId,
                barberId: barber.barberId,
                barberName: barber.barberName,
                time: a.time,
                haircutName: a.haircutName,
                isUpcoming: t.getTime() >= now
              });
            });
          });

          recent.sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime());
          const byMonth = this.emptyMonths().map((m) => ({
            ...m,
            count: allTimes.filter((t) => t.getFullYear() === m.year && t.getMonth() + 1 === m.month).length
          }));

          this.applyCrm({
            totalAppointments: allTimes.length,
            upcomingAppointments: recent.filter((r) => r.isUpcoming).length,
            completedAppointments: recent.filter((r) => !r.isUpcoming).length,
            barberCount: list.length,
            perBarber: perBarber.sort((a, b) => b.total - a.total),
            byMonth,
            recent: recent.slice(0, 25)
          });
        });
      },
      error: () => {
        this.isLoading = false;
        this.loadError = true;
      }
    });
  }

  private emptyMonths(): MonthStat[] {
    const now = new Date();
    const start = new Date(now.getFullYear(), now.getMonth() - 5, 1);
    return Array.from({ length: 6 }, (_, i) => {
      const d = new Date(start.getFullYear(), start.getMonth() + i, 1);
      return { year: d.getFullYear(), month: d.getMonth() + 1, count: 0 };
    });
  }
}
