import { Component, OnInit } from '@angular/core';
import { BarberService } from '../services/barber.service';
import { CommonModule, NgFor, NgIf, NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-companies',
  imports: [CommonModule, RouterLink, NgIf, NgFor],
  templateUrl: './companies.component.html',
  styleUrl: './companies.component.css'
})
export class CompaniesComponent implements OnInit {

  companies: any[] = [];

  constructor(private barberService: BarberService) { }

  ngOnInit(): void {
    this.barberService.getAllCompanies().subscribe({
      next: (data) => {
        this.companies = data;
        console.log(this.companies);
      },
      error: (err) => {
        console.error('Greška prilikom dohvatanja kompanija', err);
      }
    });
  }


  /* getImageSrc(driveLink: string): string {
    if (!driveLink) return ''; // Ako je null ili undefined, vrati prazan string

    const match = driveLink.match(/\/d\/(.+?)\//);
    const id = match ? match[1] : '';
    return id ? `https://drive.google.com/uc?export=view&id=${id}` : '';
  } */
}
