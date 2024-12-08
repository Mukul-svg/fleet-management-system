// register.component.ts
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule, RouterLink]
})
export class RegisterComponent {
  roles = ['Admin', 'FleetManager', 'Driver', 'MaintenanceStaff', 'Customer'];
  signupForm: FormGroup;
  errorMessage: string = '';

  constructor(private http: HttpClient, private router: Router) {
    this.signupForm = new FormGroup({
      username: new FormControl('', Validators.required),
      phoneno: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')]),
      role: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }

  onSubmit() {
    if (this.signupForm.valid) {
      this.http.post('https://fleet-backend-nu.vercel.app/api/users/register', this.signupForm.value).subscribe({
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
            } else if (userRole === 'MaintenanceStaff') {
              this.router.navigateByUrl('maintenance-dashboard');
            } else if (userRole === 'Customer') {
              this.router.navigateByUrl('customer-dashboard');
            } else {
              this.router.navigateByUrl('/');
            }
          }
        },
        error: (err) => {
          this.errorMessage = err.error?.message || 'Registration failed';
          console.error('Registration error:', err);
        }
      });
    } else {
      this.signupForm.markAllAsTouched();
    }
  }
}
