import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { I18nService } from '../../services/i18n.service';

@Component({
  selector: 'app-platform-services',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './platform-services.component.html',
  styleUrl: './platform-services.component.css'
})
export class PlatformServicesComponent {
  constructor(public i18n: I18nService) {}

  get isSr(): boolean {
    return this.i18n.language === 'sr';
  }
}
