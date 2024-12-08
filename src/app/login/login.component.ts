import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [FormsModule, RouterLink, CommonModule]
})
export class LoginComponent {
  loginObj: any = {
    email: '',
    password: ''
  };

  errorMessage: string = '';
  http = inject(HttpClient);

  constructor(private router: Router) {}

  onlogin() {
    this.http.post('https://fleet-backend-nu.vercel.app/api/users/login', this.loginObj).subscribe({
      next: (data: any) => {
        if (data.token) {
          localStorage.setItem('token', data.token);

          // Decode the token to extract user role
          const decodedToken: any = jwtDecode(data.token);
          const userRole = decodedToken.role;

          // Store the role in localStorage
          localStorage.setItem('role', userRole);

          // Navigate to respective dashboard
          if (userRole === 'Admin') {
            this.router.navigateByUrl('admin-dashboard');
          } else if (userRole === 'FleetManager') {
            this.router.navigateByUrl('fleet-dashboard');
          } else if (userRole === 'Driver') {
            this.router.navigateByUrl('driver-dashboard');
          } else if (userRole === 'Customer') {
            this.router.navigateByUrl('customer-dashboard');
          } else if (userRole === 'MaintenanceStaff') {
            this.router.navigateByUrl('maintenance-dashboard');
          } else {
            // Navigate to a default page or show an error
            this.errorMessage = 'Unauthorized role';
          }
        } else {
          this.errorMessage = 'Invalid email or password';
        }
      },
      error: (err) => {
        this.errorMessage = 'Invalid email or password';
        console.error('Login error:', err);
      }
    });
  }
}