import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../Services/Admin-Dashboard/admin-dashboard.service';
import { MatTableDataSource } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-fuellogs',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: './fuellogs.component.html',
  styleUrls: ['./fuellogs.component.scss']
})
export class FuelLogsComponent implements OnInit {
  dataSource = new MatTableDataSource<any>([]);
  displayedColumns: string[] = [
    'vehicle',
    'driver',
    'fuelType',
    'quantity',
    'cost',
    'location',
    'odometer',
    'date'
  ];

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.loadFuelLogs();
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
}