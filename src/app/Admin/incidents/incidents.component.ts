import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../Services/Admin-Dashboard/admin-dashboard.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-incidents',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './incidents.component.html',
  styleUrls: ['./incidents.component.scss']
})
export class IncidentsComponent implements OnInit {
  incidentStatuses = ['Reported', 'Under Investigation', 'Resolved', 'Closed'];
  activeTab = this.incidentStatuses[0];
  incidents: any[] = [];

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.loadIncidents();
  }

  loadIncidents(): void {
    this.dashboardService.getIncidents().subscribe({
      next: (incidents) => {
        this.incidents = incidents;
      },
      error: (err) => {
        console.error('Error fetching incidents:', err);
      }
    });
  }

  setActiveTab(status: string): void {
    this.activeTab = status;
  }

  getFilteredIncidents(): any[] {
    return this.incidents.filter(incident => incident.resolutionStatus === this.activeTab);
  }
}