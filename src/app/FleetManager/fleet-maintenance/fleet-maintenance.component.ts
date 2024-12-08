import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../Services/Admin-Dashboard/admin-dashboard.service';
import { MatTableDataSource } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-fleet-maintenance',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: './fleet-maintenance.component.html',
  styleUrls: ['./fleet-maintenance.component.scss']
})
export class FleetMaintenanceComponent implements OnInit {
  dataSource = new MatTableDataSource<any>([]);
  displayedColumns: string[] = [
    'vehicle',
    'type',
    'description',
    'cost',
    'status',
    'technician',
    'nextMaintenanceDate',
    'date'
  ];

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.loadMaintenanceLogs();
  }

  loadMaintenanceLogs(): void {
    this.dashboardService.getMaintenanceLogs().subscribe({
      next: (maintenanceLogs) => {
        this.dataSource.data = maintenanceLogs;
      },
      error: (err) => {
        console.error('Error fetching maintenance logs:', err);
      }
    });
  }
}