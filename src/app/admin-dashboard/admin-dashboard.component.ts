import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

// Interfaces for type safety
interface User {
  _id: string;
  username: string;
  email: string;
  role: 'Admin' | 'FleetManager' | 'Driver' | 'MaintenanceStaff' | 'Customer';
  isActive: boolean;
}

interface FleetPerformanceMetrics {
  totalVehicles: number;
  totalDrivers: number;
  vehicleUtilization: number;
  completedSchedules: number;
  totalSchedules: number;
}

interface Report {
  _id: string;
  type: string;
  generatedDate: Date;
  createdBy: {
    username: string;
  };
}

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    ReactiveFormsModule
  ],
  template: `
    <div class="admin-dashboard container mx-auto p-6">
      <h1 class="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <!-- User Management Section -->
      <section class="mb-8">
        <h2 class="text-2xl font-semibold mb-4">User Management</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="bg-white shadow rounded-lg p-4">
            <h3 class="font-bold mb-2">User List</h3>
            <table class="w-full">
              <thead>
                <tr class="bg-gray-100">
                  <th>Username</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let user of users" class="border-b">
                  <td>{{ user.username }}</td>
                  <td>{{ user.email }}</td>
                  <td>{{ user.role }}</td>
                  <td>
                    <span [class]="user.isActive ? 'text-green-500' : 'text-red-500'">
                      {{ user.isActive ? 'Active' : 'Inactive' }}
                    </span>
                  </td>
                  <td>
                    <button 
                      class="bg-blue-500 text-white px-2 py-1 rounded"
                      (click)="toggleUserStatus(user)"
                    >
                      Toggle Status
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="bg-white shadow rounded-lg p-4">
            <h3 class="font-bold mb-2">Fleet Performance Overview</h3>
            <div *ngIf="fleetMetrics" class="space-y-2">
              <p>Total Vehicles: {{ fleetMetrics.totalVehicles }}</p>
              <p>Total Drivers: {{ fleetMetrics.totalDrivers }}</p>
              <p>Vehicle Utilization: {{ fleetMetrics.vehicleUtilization }}%</p>
              <p>Completed Schedules: {{ fleetMetrics.completedSchedules }} / {{ fleetMetrics.totalSchedules }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Reports Section -->
      <section class="mb-8">
        <h2 class="text-2xl font-semibold mb-4">System Reports</h2>
        <div class="bg-white shadow rounded-lg p-4">
          <table class="w-full">
            <thead>
              <tr class="bg-gray-100">
                <th>Report Type</th>
                <th>Generated Date</th>
                <th>Created By</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let report of reports" class="border-b">
                <td>{{ report.type }}</td>
                <td>{{ report.generatedDate | date:'medium' }}</td>
                <td>{{ report.createdBy.username }}</td>
                <td>
                  <button 
                    class="bg-green-500 text-white px-2 py-1 rounded"
                    (click)="viewReportDetails(report._id)"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- System Configuration -->
      <section>
        <h2 class="text-2xl font-semibold mb-4">System Configuration</h2>
        <div class="bg-white shadow rounded-lg p-4">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <h3 class="font-bold mb-2">Notification Settings</h3>
              <div class="space-y-2">
                <label class="flex items-center">
                  <input type="checkbox" class="mr-2" 
                    [(ngModel)]="notificationSettings.emailAlerts"
                  >
                  Email Alerts
                </label>
                <label class="flex items-center">
                  <input type="checkbox" class="mr-2" 
                    [(ngModel)]="notificationSettings.smsAlerts"
                  >
                  SMS Alerts
                </label>
              </div>
            </div>
            <div>
              <h3 class="font-bold mb-2">Access Control</h3>
              <select 
                class="w-full border rounded p-2"
                [(ngModel)]="selectedRole"
              >
                <option *ngFor="let role of roles" [value]="role">
                  {{ role }}
                </option>
              </select>
              <button 
                class="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
                (click)="updateRolePermissions()"
              >
                Update Permissions
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: []
})
export class AdminDashboardComponent implements OnInit {
  users: User[] = [];
  reports: Report[] = [];
  fleetMetrics: FleetPerformanceMetrics | null = null;

  // Configuration settings
  notificationSettings = {
    emailAlerts: true,
    smsAlerts: false
  };

  roles = ['Admin', 'FleetManager', 'Driver', 'MaintenanceStaff', 'Customer'];
  selectedRole = 'Admin';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchUsers();
    this.fetchReports();
    this.fetchFleetPerformanceMetrics();
  }

  fetchUsers(): void {
    // Replace with actual backend endpoint
    this.http.get<User[]>('/api/users').subscribe({
      next: (users) => this.users = users,
      error: (err) => console.error('Failed to fetch users', err)
    });
  }

  fetchReports(): void {
    // Replace with actual backend endpoint
    this.http.get<Report[]>('/api/reports').subscribe({
      next: (reports) => this.reports = reports,
      error: (err) => console.error('Failed to fetch reports', err)
    });
  }

  fetchFleetPerformanceMetrics(): void {
    // Replace with actual backend endpoint for fleet overview
    this.http.get<FleetPerformanceMetrics>('/api/fleet/performance').subscribe({
      next: (metrics) => this.fleetMetrics = metrics,
      error: (err) => console.error('Failed to fetch fleet metrics', err)
    });
  }

  toggleUserStatus(user: User): void {
    // Replace with actual backend endpoint
    this.http.patch(`/api/users/${user._id}/status`, { 
      isActive: !user.isActive 
    }).subscribe({
      next: (updatedUser: any) => {
        const index = this.users.findIndex(u => u._id === user._id);
        if (index !== -1) {
          this.users[index].isActive = updatedUser.isActive;
        }
      },
      error: (err) => console.error('Failed to update user status', err)
    });
  }

  viewReportDetails(reportId: string): void {
    this.router.navigate(['/reports', reportId]);
  }

  updateRolePermissions(): void {
    // Placeholder for role permission update logic
    console.log(`Updating permissions for role: ${this.selectedRole}`);
    // Implement actual permission update logic
  }
}