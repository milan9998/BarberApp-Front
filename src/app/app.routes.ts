import { Routes } from '@angular/router';
import { CompaniesComponent } from './companies/companies.component';
import { CompanyBarbersComponent } from './company-barbers/company-barbers.component';
import { CreateCompanyComponent } from './create-company/create-company.component';
import { HomeComponent } from './home/home.component';
import { CreateBarberComponent } from './create-barber/create-barber.component';
import { LoginComponent } from './auth/login/login.component';
import { AdminGuard } from './auth/guards/guards';
import { RegisterComponent } from './auth/register/register.component';
import { CreateCompanyOwnerComponent } from './auth/create-company-owner/create-company-owner.component';
import { AddHaircutComponent } from './add-haircut/add-haircut.component';
import { OwnerGuard } from './auth/guards/owner-guard';
import { AboutComponent } from './pages/about/about.component';
import { HowItWorksComponent } from './pages/how-it-works/how-it-works.component';
import { VerifyEmailComponent } from './auth/verify-email/verify-email.component';
import { PlatformServicesComponent } from './pages/platform-services/platform-services.component';
import { AdminPanelComponent } from './admin/admin-panel.component';
import { OwnerCrmComponent } from './owner/owner-crm.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'about', component: AboutComponent },
    { path: 'how-it-works', component: HowItWorksComponent },
    { path: 'services', component: PlatformServicesComponent },
    { path: 'admin', component: AdminPanelComponent, canActivate: [AdminGuard] },
    { path: 'owner/crm/:companyId', component: OwnerCrmComponent, canActivate: [OwnerGuard] },
    { path: 'companies', component: CompaniesComponent },
    { path: 'companies/:id', component: CompanyBarbersComponent },
    { path: 'create-company', component: CreateCompanyComponent, canActivate: [AdminGuard] },
    { path: 'create-barber/:companyId', component: CreateBarberComponent, canActivate: [OwnerGuard] },
    { path: 'create-haircut/:companyId', component: AddHaircutComponent, canActivate: [OwnerGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'verify-email', component: VerifyEmailComponent },
    { path: 'create-company-owner/:companyId', component: CreateCompanyOwnerComponent, canActivate: [AdminGuard] }
];
