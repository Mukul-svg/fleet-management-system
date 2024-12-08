import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../Services/Admin-Dashboard/admin-dashboard.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-report',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {
  reportTypes = ['Fleet Overview', 'Driver Performance', 'Maintenance Cost', 'Fuel Efficiency', 'Vehicle Utilization'];
  activeTab = this.reportTypes[0];
  reportData: any;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.loadReport(this.activeTab);
  }

  loadReport(type: string): void {
    const startDate = '2023-01-01T00:00:00Z'; // Example start date
    const endDate = '2023-01-31T23:59:59Z'; // Example end date
    const parameters = {}; // Example parameters, adjust as needed

    this.dashboardService.generateReport(type, startDate, endDate, parameters).subscribe({
      next: (report) => {
        this.reportData = report;
      },
      error: (err) => {
        console.error('Error fetching report:', err);
      }
    });
  }

  setActiveTab(type: string): void {
    this.activeTab = type;
    this.loadReport(this.activeTab);
  }
}