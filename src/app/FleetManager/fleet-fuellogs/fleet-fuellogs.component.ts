// fleet-fuellogs.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { DashboardService } from '../../Services/Admin-Dashboard/admin-dashboard.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-fleet-fuellogs',
  standalone: true,
  imports: [CommonModule, MatTableModule, ReactiveFormsModule],
  templateUrl: './fleet-fuellogs.component.html',
  styleUrls: ['./fleet-fuellogs.component.scss']
})
export class FleetFuellogsComponent implements OnInit {
  createFuellogForm: FormGroup;
  isFormVisible = false;
  dataSource = new MatTableDataSource<any>([]);
  displayedColumns: string[] = ['vehicle', 'driver', 'fuelType', 'quantity', 'cost', 'location', 'odometer', 'date'];

  vehicles: any[] = [];
  drivers: any[] = [];

  constructor(
    private fb: FormBuilder,
    private dashboardService: DashboardService,
    private snackBar: MatSnackBar
  ) {
    this.createFuellogForm = this.fb.group({
      vehicle: ['', Validators.required],
      driver: ['', Validators.required],
      fuelType: ['', Validators.required],
      quantity: [0, [Validators.required, Validators.min(1)]],
      cost: [0, [Validators.required, Validators.min(0)]],
      location: ['', Validators.required],
      odometer: [0, [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    this.loadVehicles();
    this.loadDrivers();
    this.loadFuelLogs();
  }

  toggleForm(): void {
    this.isFormVisible = !this.isFormVisible;
    if (!this.isFormVisible) {
      this.createFuellogForm.reset();
    }
  }

  loadVehicles(): void {
    this.dashboardService.fetchVehicles().subscribe({
      next: (vehicles) => {
        this.vehicles = vehicles;
      },
      error: (err) => {
        console.error('Error fetching vehicles:', err);
      }
    });
  }

  loadDrivers(): void {
    this.dashboardService.fetchDrivers().subscribe({
      next: (drivers) => {
        this.drivers = drivers;
      },
      error: (err) => {
        console.error('Error fetching drivers:', err);
      }
    });
  }

  loadFuelLogs(): void {
    this.dashboardService.getFuelLogs().subscribe({
      next: (fuellogs) => {
        this.dataSource.data = fuellogs;
      },
      error: (err) => {
        console.error('Error fetching fuel logs:', err);
      }
    });
  }
  getVehicleDetails(vehicleId: string): string {
    const vehicle = this.vehicles.find(v => v._id === vehicleId);
    return vehicle ? `${vehicle.make} ${vehicle.model} (${vehicle.licensePlate})` : 'Unknown Vehicle';
  }
  
  getDriverName(driverId: string): string {
    const driver = this.drivers.find(d => d._id === driverId);
    return driver ? driver.name : 'Unknown Driver';
  }

  onSubmit(): void {
    if (this.createFuellogForm.valid) {
      const formData: any = this.createFuellogForm.value;
      this.dashboardService.createFuelLog(formData).subscribe({
        next: () => {
          this.snackBar.open('Fuel log created successfully!', 'Close', { duration: 3000 });
          this.createFuellogForm.reset();
          this.isFormVisible = false;
          this.loadFuelLogs();
        },
        error: (err) => {
          console.error('Error creating fuel log:', err);
          this.snackBar.open('Failed to create fuel log.', 'Close', { duration: 3000 });
        }
      });
    } else {
      this.createFuellogForm.markAllAsTouched();
    }
  }
}