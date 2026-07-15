import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { I18nService } from '../../services/i18n.service';

@Component({
  selector: 'app-verify-email',
  standalone: true,
  imports: [CommonModule, RouterLink, TranslatePipe],
  templateUrl: './verify-email.component.html',
  styleUrl: './verify-email.component.css'
})
export class VerifyEmailComponent implements OnInit {
  status: 'success' | 'error' | 'pending' = 'pending';
  message = '';

  constructor(
    private route: ActivatedRoute,
    private i18n: I18nService
  ) {}

  ngOnInit(): void {
    const status = this.route.snapshot.queryParamMap.get('status');
    const message = this.route.snapshot.queryParamMap.get('message');

    if (status === 'success' || status === 'error') {
      this.status = status;
    } else {
      this.status = 'error';
    }

    this.message = this.i18n.localizeMessage(
      message,
      this.status === 'success' ? 'verify.defaultSuccess' : 'verify.defaultError'
    );
  }
}
