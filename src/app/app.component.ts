import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';
import { NgIf } from '@angular/common';
import { TranslatePipe } from './pipes/translate.pipe';
import { I18nService } from './services/i18n.service';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatToolbarModule, MatButtonModule, RouterLink, NgIf, TranslatePipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'BarberVisual';
  isLoggedIn = false;
  constructor(
    private authService: AuthService,
    private router: Router,
    public i18nService: I18nService
  ) {}


  ngOnInit(): void {
    this.authService.isLoggedin$.subscribe((status) => {
      this.isLoggedIn = status;
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/home']);
  }

  toggleLanguage(): void {
    this.i18nService.toggleLanguage();
  }

}
