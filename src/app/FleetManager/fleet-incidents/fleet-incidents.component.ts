// src/app/FleetManager/fleet-incidents/fleet-incidents.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { DashboardService } from '../../Services/Admin-Dashboard/admin-dashboard.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { forkJoin } from 'rxjs';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-fleet-incidents',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './fleet-incidents.component.html',
  styleUrls: ['./fleet-incidents.component.scss']
})
export class FleetIncidentsComponent implements OnInit {
  incidentStatuses = ['Reported', 'Under Investigation', 'Resolved', 'Closed'];
  activeTab = this.incidentStatuses[0];
  incidents: any[] = [];
  vehicles: any[] = [];
  drivers: any[] = [];
  isFleetManager: boolean = false; // Flag to determine user role

  reportIncidentForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dashboardService: DashboardService,
    private snackBar: MatSnackBar
  ) {
    this.reportIncidentForm = this.fb.group({
      vehicle: ['', Validators.required],
      driver: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadUserRole();
    forkJoin({
      incidents: this.dashboardService.getIncidents(),
      vehicles: this.dashboardService.fetchVehicles(),
      drivers: this.dashboardService.fetchDrivers()
    }).subscribe({
      next: ({ incidents, vehicles, drivers }) => {
        this.incidents = incidents;
        this.vehicles = vehicles;
        this.drivers = drivers;
      },
      error: (err) => {
        console.error('Error loading data:', err);
        this.snackBar.open('Failed to load data.', 'Close', { duration: 3000 });
      }
    });
  }

  // Method to determine if the user is a Fleet Manager
  loadUserRole(): void {
    this.isFleetManager = true; // Change based on actual user role
  }

  setActiveTab(status: string): void {
    this.activeTab = status;
  }

  getFilteredIncidents(): any[] {
    console.log(this.incidents)
    return this.incidents.filter(incident => incident.resolutionStatus === this.activeTab);
  }

  onSubmit(): void {
    if (this.reportIncidentForm.valid) {
      const vehicleId = this.reportIncidentForm.get('vehicle')?.value;
      const driverId = this.reportIncidentForm.get('driver')?.value;
      const description = this.reportIncidentForm.get('description')?.value;

      console.log('Submitting Incident Data:', { vehicleId, driverId, description });

      const incidentData = {
        vehicle: vehicleId,
        driver: driverId,
        description: description,
      };

      this.dashboardService.reportIncident(incidentData).subscribe({
        next: (newIncident) => {
          this.snackBar.open('Incident reported successfully!', 'Close', { duration: 3000 });
          this.reportIncidentForm.reset();
          this.incidents.push(newIncident); // Add the new incident to the list
        },
        error: (err) => {
          console.error('Incident reporting error:', err);
          this.snackBar.open('Failed to report incident.', 'Close', { duration: 3000 });
        }
      });
    } else {
      this.snackBar.open('Please fill out all required fields.', 'Close', { duration: 3000 });
    }
  }

  // Method to update incident status
  updateStatus(incidentId: string, newStatus: string): void {
    this.dashboardService.updateIncidentStatus(incidentId, newStatus).subscribe({
      next: (updatedIncident) => {
        // Update the incident in the local list
        const index = this.incidents.findIndex(incident => incident._id === updatedIncident._id);
        if (index !== -1) {
          this.incidents[index] = updatedIncident;
        }
        this.snackBar.open('Incident status updated successfully!', 'Close', { duration: 3000 });
      },
      error: (err) => {
        console.error('Incident status update error:', err);
        this.snackBar.open('Failed to update incident status.', 'Close', { duration: 3000 });
      }
    });
  }
}