import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DashboardService } from '../../Services/Admin-Dashboard/admin-dashboard.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-fleet-schedule',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MatTableModule],
  templateUrl: './fleet-schedule.component.html',
  styleUrls: ['./fleet-schedule.component.scss']
})
export class FleetScheduleComponent implements OnInit {
  dataSource = new MatTableDataSource<any>([]);
  displayedColumns: string[] = ['vehicle', 'driver', 'route', 'startTime', 'endTime', 'status', 'cargo'];
  createScheduleForm: FormGroup;
  isFormVisible = false;
  vehicles: any[] = [];
  drivers: any[] = [];
  routes: any[] = [];
  cargos: any[] = [];
  users: any[] = [];
  constructor(
    private dashboardService: DashboardService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.createScheduleForm = this.fb.group({
      vehicle: ['', Validators.required],
      driver: ['', Validators.required],
      route: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      cargo: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadSchedules();
    this.loadVehicles();
    this.loadDrivers();
    this.loadRoutes();
    this.loadCargos();
  }

  loadSchedules(): void {
    this.dashboardService.getSchedules().subscribe({
      next: (schedules) => {
        this.dataSource.data = schedules;
      },
      error: (err) => {
        console.error('Error fetching schedules:', err);
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

  loadRoutes(): void {
    this.dashboardService.getRoutes().subscribe({
      next: (routes) => {
        this.routes = routes;
      },
      error: (err) => {
        console.error('Error fetching routes:', err);
      }
    });
  }

  loadCargos(): void {
    this.dashboardService.getCargos().subscribe({
      next: (cargos) => {
        this.cargos = cargos.filter((cargo:any) => cargo.deliveryStatus === 'Pending');
      },
      error: (err) => {
        console.error('Error fetching cargos:', err);
      }
    });
  }

  loadUsers(): void {
    this.dashboardService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
      },
      error: (err) => {
        console.error('Error fetching schedules:', err);
      }
    });
  }
  toggleForm(): void {
    this.isFormVisible = !this.isFormVisible;
  }

  onSubmit(): void {
    if (this.createScheduleForm.valid) {
      const formData = this.createScheduleForm.value;
      this.dashboardService.createSchedule(formData).subscribe({
        next: (response) => {
          this.snackBar.open('Schedule created successfully!', 'Close', { duration: 3000 });
          this.createScheduleForm.reset();
          this.isFormVisible = false;
          this.loadSchedules();
        },
        error: (err) => {
          console.error('Error creating schedule:', err);
          this.snackBar.open('Failed to create schedule.', 'Close', { duration: 3000 });
        }
      });
    } else {
      this.createScheduleForm.markAllAsTouched();
    }
  }

  getStatusClass(status: string): string {
    const statusClassMap: { [key: string]: string } = {
      'Scheduled': 'status-scheduled',
      'In Progress': 'status-in-progress',
      'Completed': 'status-completed',
      'Cancelled': 'status-cancelled'
    };
    return statusClassMap[status as keyof typeof statusClassMap] || 'status-default';
  }

  getuserName(userId: string): string {
    if (!this.users.length) {
      this.loadUsers();
    }
    const driver = this.users.find((driver) => driver._id == userId);
    return driver ? driver.username : 'N/A';
  }
}