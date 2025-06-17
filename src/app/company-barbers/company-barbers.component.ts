import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BarberService } from '../services/barber.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-company-barbers',
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './company-barbers.component.html'

})

export class CompanyBarbersComponent implements OnInit {




  companyId: string | null = null;
  barbers: any[] = [];
  selectedBarberId: string | null = null;
  selectedDate: Date = new Date();
  today: string = "";
  datepicker: Date = new Date();


  //(YYYY-MM-DD)
  freeAppointments: any[] = [];
  firstName: string = "";
  lastName: string= "";
  email: string = "";
  phoneNumber: string = "";
  haircut: string = "";


  constructor(private barberService: BarberService, private route: ActivatedRoute) { }

  ngOnInit(): void {

    const now = new Date();

    this.today = now.toISOString().split('T')[0]; // Format: 'YYYY-MM-DD'


    this.companyId = this.route.snapshot.paramMap.get('id');

    if (this.companyId) {
      this.barberService.getAllBarbersByCompanyId(this.companyId).subscribe({
        next: (data) => {
          this.barbers = data;
          console.log(this.barbers)
        },
        error: (err) => {
          console.error(err);
        }
      });
    }

  }

  onBarberClick(barberId: string): void {
    this.selectedBarberId = barberId;
    this.loadAppointments();
  }

  onDateChange(): void {
    if (typeof this.selectedDate === 'string') {
      this.selectedDate = new Date(this.selectedDate); // konvertuj iz stringa u Date
    }

    if (this.selectedBarberId) {
      this.loadAppointments();
    }
  }
  onDatePick(datepick: Date): void {
    this.datepicker = datepick
    console.log(this.datepicker)
  }


  loadAppointments(): void {
    //const date = new Date(this.selectedDate); // 👈 osiguraj da je Date objekat

    this.barberService.getAllFreeAppointmentsByBarberId(this.selectedDate, this.selectedBarberId!).subscribe({
      next: (data) => {
        console.log(data);
        this.freeAppointments = data;
      },
      error: (err) => console.error(err)
    });
  }


  onSubmit():void {
   const formData = new FormData();

  let selectedDateTime: Date;
  if (typeof this.datepicker === 'string') {
    selectedDateTime = new Date(this.datepicker);
  } else {
    selectedDateTime = this.datepicker;
  }

  // Dodaj sva polja sa tačnim nazivima koje backend očekuje
  formData.append('Schedule.firstName', this.firstName);
  formData.append('Schedule.lastName', this.lastName);
  formData.append('Schedule.email', this.email);
  formData.append('Schedule.phoneNumber', this.phoneNumber);
  formData.append('Schedule.haircut', this.haircut);
  formData.append('Schedule.time', selectedDateTime.toISOString());

  if (this.selectedBarberId) {
    formData.append('Schedule.barberId', this.selectedBarberId);
  }

  // Poziv servisa
  this.barberService.createSchedule(formData).subscribe({
    next: (response) => {
      console.log('Uspešno zakazano:', response);
    },
    error: (error) => {
      console.error('Greška prilikom zakazivanja:', error);
    }
  });

}


}
