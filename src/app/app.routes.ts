import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { authGuard } from './guard/auth.guard';

export const routes: Routes = [
  { path: '', component: LandingpageComponent }, // Root route
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { 
    path: 'admin-dashboard', 
    component: AdminDashboardComponent, 
    canActivate: [authGuard] // Protect the route
  },
  { path: '**', redirectTo: '', pathMatch: 'full' } // Fallback for undefined routes
];
