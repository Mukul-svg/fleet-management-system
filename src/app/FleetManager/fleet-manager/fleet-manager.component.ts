import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DashboardService } from '../../Services/Admin-Dashboard/admin-dashboard.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Vehicle {
  _id: string;
  make: string;
  model: string;
  licensePlate: string;
  currentLocation: {
    latitude: number;
    longitude: number;
  };
  status: 'Available' | 'In Use' | 'Maintenance' | 'Unavailable';
  year: number;
  fuelType: string;
  capacity: number;
}

@Component({
  selector: 'app-fleet-manager',
  standalone: true,
  imports: [MatTableModule, ReactiveFormsModule, CommonModule],
  templateUrl: './fleet-manager.component.html',
  styleUrls: ['./fleet-manager.component.scss'],
})
export class FleetManagerComponent implements OnInit {
  dataSource = new MatTableDataSource<Vehicle>([]);
  displayedColumns: string[] = [
    'make',
    'model',
    'licensePlate',
    'location',
    'status',
  ];

  createVehicleForm: FormGroup;
  isFormVisible = false; // Add this line

  constructor(
    private dashboardService: DashboardService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.createVehicleForm = this.fb.group({
      make: ['', Validators.required],
      model: ['', Validators.required],
      licensePlate: ['', Validators.required],
      status: ['', Validators.required],
      currentLocation: this.fb.group({
        latitude: [
          '',
          [
            Validators.required,
            Validators.pattern('^[-+]?([1-8]?\\d(\\.\\d+)?|90(\\.0+)?)$'),
          ],
        ],
        longitude: [
          '',
          [
            Validators.required,
            Validators.pattern(
              '^[-+]?((1[0-7]\\d)|([1-9]?\\d))(\\.\\d+)?$'
            ),
          ],
        ],
      }),
      year: [
        '',
        [
          Validators.required,
          Validators.min(1900),
          Validators.max(new Date().getFullYear()),
        ],
      ],
      fuelType: ['', Validators.required],
      capacity: ['', [Validators.required, Validators.min(1)]],
    });
  }

  ngOnInit(): void {
    this.loadVehicles();
  }

  loadVehicles(): void {
    this.dashboardService.fetchVehicles().subscribe({
      next: (vehicles) => {
        this.dataSource.data = vehicles;
      },
      error: (err) => {
        console.error('Error fetching vehicles:', err);
      },
    });
  }

  onSubmit(): void {
    if (this.createVehicleForm.valid) {
      const formData = this.createVehicleForm.value;

      this.dashboardService.createVehicle(formData).subscribe({
        next: () => {
          this.snackBar.open('Vehicle created successfully!', 'Close', {
            duration: 3000,
          });
          this.createVehicleForm.reset();
          this.loadVehicles();
          this.isFormVisible = false; // Hide the form after submission
        },
        error: (err) => {
          console.error('Vehicle creation error:', err);
          const errorMessage =
            err.error?.message ||
            err.message ||
            'Failed to create vehicle!';
          this.snackBar.open(errorMessage, 'Close', {
            duration: 3000,
          });
        },
      });
    } else {
      Object.keys(this.createVehicleForm.controls).forEach((field) => {
        const control = this.createVehicleForm.get(field);
        if (control) {
          control.markAsTouched({ onlySelf: true });
        }
      });
    }
  }

  getStatusColor(status: Vehicle['status']): string {
    switch (status) {
      case 'Available':
        return 'text-green-600';
      case 'In Use':
        return 'text-yellow-600';
      case 'Maintenance':
        return 'text-orange-600';
      case 'Unavailable':
        return 'text-red-600';
      default:
        return '';
    }
  }
}