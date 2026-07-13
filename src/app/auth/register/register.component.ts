import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { I18nService } from '../../services/i18n.service';

@Component({
  selector: 'app-register',
  imports: [CommonModule, FormsModule, TranslatePipe, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  email = '';
  password = '';
  confirmPassword = '';
  phoneNumber = '';
  firstName = '';
  lastName = '';
  isSubmitting = false;
  feedback = '';
  feedbackIsError = false;
  registerSucceeded = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private i18n: I18nService
  ) {}

  get passwordHasMinLength(): boolean {
    return this.password.length >= 6;
  }

  get passwordHasDigit(): boolean {
    return /\d/.test(this.password);
  }

  get passwordHasUpper(): boolean {
    return /[A-Z]/.test(this.password);
  }

  get passwordHasLower(): boolean {
    return /[a-z]/.test(this.password);
  }

  get passwordHasSpecial(): boolean {
    return /[^a-zA-Z0-9]/.test(this.password);
  }

  get passwordsMatch(): boolean {
    return this.password.length > 0 && this.password === this.confirmPassword;
  }

  get passwordMeetsRules(): boolean {
    return (
      this.passwordHasMinLength &&
      this.passwordHasDigit &&
      this.passwordHasUpper &&
      this.passwordHasLower &&
      this.passwordHasSpecial
    );
  }

  onPhoneChange(value: string): void {
    this.phoneNumber = (value || '').replace(/\D/g, '');
  }

  onSubmit(): void {
    this.feedback = '';
    this.feedbackIsError = false;

    if (!this.firstName.trim() || !this.lastName.trim() || !this.email.trim() || !this.phoneNumber.trim() || !this.password || !this.confirmPassword) {
      this.showError(this.i18n.t('auth.fillAllFields'));
      return;
    }

    if (!this.passwordMeetsRules) {
      return;
    }

    if (!this.passwordsMatch) {
      this.showError(this.i18n.t('auth.passwordsMismatch'));
      return;
    }

    if (this.isSubmitting) {
      return;
    }

    this.isSubmitting = true;
    const formData = new FormData();
    formData.append('Register.Email', this.email.trim());
    formData.append('Register.Password', this.password);
    formData.append('Register.ConfirmPassword', this.confirmPassword);
    formData.append('Register.PhoneNumber', this.phoneNumber.trim());
    formData.append('Register.FirstName', this.firstName.trim());
    formData.append('Register.LastName', this.lastName.trim());

    this.authService.register(formData).subscribe({
      next: (response) => {
        this.isSubmitting = false;
        this.registerSucceeded = true;
        this.feedbackIsError = false;
        this.feedback = response?.message || this.i18n.t('auth.registerSuccess');
      },
      error: (error: HttpErrorResponse) => {
        this.isSubmitting = false;
        this.registerSucceeded = false;
        this.showError(this.extractError(error));
      }
    });
  }

  goToLogin(): void {
    this.router.navigate(['/login'], { queryParams: { notice: 'verify' } });
  }

  private showError(message: string): void {
    this.feedbackIsError = true;
    this.feedback = message;
  }

  private extractError(error: HttpErrorResponse): string {
    if (error.status === 0) {
      return 'API nije dostupan. Proverite da li backend radi.';
    }

    if (error.status === 400 && error.error?.errors) {
      const validationErrors = error.error.errors;
      const messages: string[] = [];
      for (const field of Object.keys(validationErrors)) {
        messages.push(...validationErrors[field]);
      }
      return messages.join('\n') || 'Neispravni podaci.';
    }

    const detail = error.error?.detail || error.error?.title || error.error?.message;
    if (typeof detail === 'string' && detail.trim()) {
      return detail;
    }

    if (typeof error.error === 'string' && error.error.trim()) {
      return error.error;
    }

    return `Greška pri registraciji (${error.status || 'network'}).`;
  }
}
