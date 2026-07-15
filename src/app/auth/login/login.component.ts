import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { I18nService } from '../../services/i18n.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, TranslatePipe, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  email = '';
  password = '';
  isSubmitting = false;
  feedback = '';
  feedbackIsError = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private i18n: I18nService
  ) {}

  ngOnInit(): void {
    const notice = this.route.snapshot.queryParamMap.get('notice');
    if (notice === 'verify') {
      this.feedbackIsError = false;
      this.feedback = this.i18n.t('auth.loginNoticeVerify');
    } else if (notice === 'verified') {
      this.feedbackIsError = false;
      this.feedback = this.i18n.t('auth.loginNoticeVerified');
    }
  }

  onSubmit(): void {
    this.feedback = '';
    this.feedbackIsError = false;

    if (!this.email.trim() || !this.password) {
      this.showError(this.i18n.t('auth.enterEmailPassword'));
      return;
    }

    if (this.isSubmitting) {
      return;
    }

    this.isSubmitting = true;
    const formData = new FormData();
    formData.append('LoginDto.Email', this.email.trim());
    formData.append('LoginDto.Password', this.password);

    this.authService.login(formData).subscribe({
      next: (response) => {
        this.isSubmitting = false;
        if (response?.companyIds?.length) {
          this.authService.setOwnerCompanyId(response.companyIds[0]);
        } else if (response?.companyId) {
          this.authService.setOwnerCompanyId(response.companyId);
        }
        const ownerCompany = response?.companyIds?.[0] || response?.companyId;
        this.router.navigate(
          response?.role === 'Admin'
            ? ['/admin']
            : response?.role === 'CompanyOwner' && ownerCompany
              ? ['/owner/crm', ownerCompany]
              : ['/home']
        );
      },
      error: (error: HttpErrorResponse) => {
        this.isSubmitting = false;
        this.showError(this.extractError(error));
      }
    });
  }

  private showError(message: string): void {
    this.feedbackIsError = true;
    this.feedback = message;
  }

  private extractError(error: HttpErrorResponse): string {
    if (error.status === 0) {
      return this.i18n.t('auth.apiUnavailable');
    }

    if (error.error?.errors) {
      const validationErrors = error.error.errors;
      const messages: string[] = [];
      for (const field of Object.keys(validationErrors)) {
        messages.push(...validationErrors[field]);
      }
      if (messages.length) {
        return messages.map((m) => this.i18n.localizeMessage(m)).join('\n');
      }
    }

    const detail = error.error?.detail || error.error?.title || error.error?.message;
    if (typeof detail === 'string' && detail.trim()) {
      return this.i18n.localizeMessage(detail, 'auth.loginFailed');
    }

    return this.i18n.t('auth.loginFailed');
  }
}
