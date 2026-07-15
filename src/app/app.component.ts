import { Component, HostListener, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';
import { NgIf } from '@angular/common';
import { TranslatePipe } from './pipes/translate.pipe';
import { AppLanguage, I18nService } from './services/i18n.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatToolbarModule, MatButtonModule, RouterLink, RouterLinkActive, NgIf, TranslatePipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'Barber Control Headquarters';
  isLoggedIn = false;
  isAdmin = false;
  isOwner = false;
  isBarber = false;
  ownerCompanyId: string | null = null;
  mobileMenuOpen = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    public i18nService: I18nService
  ) {}

  ngOnInit(): void {
    this.authService.isLoggedin$.subscribe((status) => {
      this.isLoggedIn = status;
      this.isAdmin = this.authService.isAdmin();
      this.isOwner = this.authService.isOwner();
      this.isBarber = this.authService.isBarber();
      this.ownerCompanyId = this.authService.getOwnerCompanyId();
    });

    this.router.events.pipe(filter((e) => e instanceof NavigationEnd)).subscribe(() => {
      this.closeMobileMenu();
    });
  }

  get showStaffPanel(): boolean {
    return this.isLoggedIn && (this.isAdmin || this.isOwner || this.isBarber);
  }

  get staffTitleKey(): string {
    if (this.isAdmin) {
      return 'sidebar.admin';
    }
    if (this.isOwner) {
      return 'sidebar.owner';
    }
    return 'sidebar.barber';
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
    this.syncBodyScroll();
  }

  closeMobileMenu(): void {
    if (!this.mobileMenuOpen) {
      return;
    }
    this.mobileMenuOpen = false;
    this.syncBodyScroll();
  }

  setLanguage(language: AppLanguage): void {
    this.i18nService.setLanguage(language);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/home']);
  }

  @HostListener('window:resize')
  onResize(): void {
    if (typeof window !== 'undefined' && window.innerWidth > 900 && this.mobileMenuOpen) {
      this.closeMobileMenu();
    }
  }

  private syncBodyScroll(): void {
    if (typeof document === 'undefined') {
      return;
    }
    document.body.style.overflow = this.mobileMenuOpen ? 'hidden' : '';
  }
}
