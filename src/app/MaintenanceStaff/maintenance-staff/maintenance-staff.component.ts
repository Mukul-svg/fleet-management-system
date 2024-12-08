import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../Services/Admin-Dashboard/admin-dashboard.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-maintenance-staff',
  standalone: true,
  imports: [CommonModule, MatTableModule, ReactiveFormsModule],
  templateUrl: './maintenance-staff.component.html',
  styleUrls: ['./maintenance-staff.component.scss']
})
export class MaintenanceStaffComponent implements OnInit {
  dataSource = new MatTableDataSource<any>([]);
  displayedColumns: string[] = [
    'vehicle',
    'type',
    'description',
    'cost',
    'status',
    'technician',
    'nextMaintenanceDate',
    'date',
    'actions'
  ];
  maintenanceForm: FormGroup;
  isFormVisible = false;
  vehicles: any[] = [];

  constructor(
    private dashboardService: DashboardService,
    private snackBar: MatSnackBar,
    private fb: FormBuilder
  ) {
    this.maintenanceForm = this.fb.group({
      vehicle: ['', Validators.required],
      type: ['', Validators.required],
      description: ['', Validators.required],
      cost: ['', Validators.required],
      technician: ['', Validators.required],
      nextMaintenanceDate: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadMaintenanceLogs();
    this.loadVehicles();
  }

  onStatusChange(maintenanceId: string | undefined, event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const newStatus = selectElement.value;
    if (maintenanceId) {
      this.updateMaintenanceStatus(maintenanceId, newStatus);
    }
  } 

  loadMaintenanceLogs(): void {
    this.dashboardService.getAllMaintenanceRecords().subscribe({
      next: (maintenanceLogs) => {
        this.dataSource.data = maintenanceLogs;
      },
      error: (err) => {
        console.error('Error fetching maintenance logs:', err);
      }
    });
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

  toggleForm(): void {
    this.isFormVisible = !this.isFormVisible;
  }

  onSubmit(): void {
    if (this.maintenanceForm.valid) {
      const formData = this.maintenanceForm.value;
      this.dashboardService.scheduleMaintenance(formData).subscribe({
        next: () => {
          this.snackBar.open('Maintenance scheduled successfully!', 'Close', { duration: 3000 });
          this.maintenanceForm.reset();
          this.isFormVisible = false;
          this.loadMaintenanceLogs();
        },
        error: (err) => {
          console.error('Error scheduling maintenance:', err);
          this.snackBar.open('Failed to schedule maintenance.', 'Close', { duration: 3000 });
        }
      });
    } else {
      this.maintenanceForm.markAllAsTouched();
    }
  }

  updateMaintenanceStatus(maintenanceId: string, status: string): void {
    this.dashboardService.updateMaintenanceStatus(maintenanceId, status).subscribe({
      next: () => {
        this.snackBar.open('Maintenance status updated successfully!', 'Close', { duration: 3000 });
        this.loadMaintenanceLogs();
      },
      error: (err) => {
        console.error('Error updating maintenance status:', err);
        this.snackBar.open('Failed to update maintenance status.', 'Close', { duration: 3000 });
      }
    });
  }
}