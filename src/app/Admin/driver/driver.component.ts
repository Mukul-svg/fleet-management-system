import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../Services/Admin-Dashboard/admin-dashboard.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReactiveFormsModule } from '@angular/forms';

interface Driver {
  _id: string;
  name: string;
  licenseNumber: string;
  rating: number;
  status: 'Available' | 'Unavailable' | 'On Duty';
  licenseExpiry: string;
  contactInfo: {
    phone: string;
    email: string;
  };
}

@Component({
  selector: 'app-driver',
  standalone: true,
  imports: [MatTableModule, CommonModule, ReactiveFormsModule],
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.scss']
})
export class DriverComponent implements OnInit {
  ngOnInit(): void {
    this.loadDrivers();
    this.loadEligibleUsers();
  }
  
  dataSource = new MatTableDataSource<Driver>([]);
  displayedColumns: string[] = ['name', 'licenseNumber', 'contactInfo', 'rating', 'status', 'licenseExpiry'];
  
  createDriverForm: FormGroup;
  eligibleUsers: any[] = [];

  constructor(
    private dashboardService: DashboardService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.createDriverForm = this.fb.group({
      userId: ['', Validators.required],
      name: ['', Validators.required],
      licenseNumber: ['', Validators.required],
      contactInfo: this.fb.group({
        phone: ['', [Validators.required, Validators.pattern('^[0-9]{10,15}$')]],
        email: ['', [Validators.required, Validators.email]]
      }),
      licenseExpiry: ['', Validators.required],
    });
  }

  loadDrivers(): void {
    this.dashboardService.fetchDrivers().subscribe({
      next: (drivers) => {
        this.dataSource.data = drivers;
      },
      error: (err) => {
        console.error('Error fetching drivers:', err);
      },
    });
  }

  loadEligibleUsers(): void {
    this.dashboardService.fetchEligibleUsers().subscribe({
      next: (users) => {
        console.log('Eligible users:', users);
        this.eligibleUsers = users;
      },
      error: (err) => {
        console.error('Error fetching eligible users:', err);
      },
    });
  }

  onSubmit(): void {
    if (this.createDriverForm.valid) {
      const formData = {
        name: this.createDriverForm.get('name')!.value,
        licenseNumber: this.createDriverForm.get('licenseNumber')!.value,
        contactInfo: this.createDriverForm.get('contactInfo')!.value,
        licenseExpiry: this.createDriverForm.get('licenseExpiry')!.value,
        userId: this.createDriverForm.get('userId')!.value
      };
  
      console.log('Submitting form data:', formData);
  
      this.dashboardService.createDriver(formData).subscribe({
        next: (response) => {
          console.log('Driver creation response:', response);
          this.snackBar.open('Driver created successfully!', 'Close', {
            duration: 3000,
          });
          this.createDriverForm.reset();
          this.loadDrivers();
        },
        error: (err) => {
          console.error('Driver creation error:', err);
          const errorMessage = err.error?.message || 
                               err.message || 
                               'Failed to create driver!';
          this.snackBar.open(errorMessage, 'Close', {
            duration: 3000,
          });
        },
      });
    } else {
      // Mark all fields as touched to show validation errors
      Object.keys(this.createDriverForm.controls).forEach(field => {
        const control = this.createDriverForm.get(field);
        if (control) {
          control.markAsTouched({ onlySelf: true });
        }
      });
    }
  }

  getStatusColor(status: Driver['status']): string {
    const statusColorMap = {
      'Available': 'bg-green-100 text-green-800',
      'Unavailable': 'bg-red-100 text-red-800',
      'On Duty': 'bg-blue-100 text-blue-800',
    };
    return statusColorMap[status] || 'bg-gray-100 text-gray-800';
  }
}