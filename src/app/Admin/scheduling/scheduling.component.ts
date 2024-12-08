import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../Services/Admin-Dashboard/admin-dashboard.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import { DatePipe } from '@angular/common';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-scheduling',
  standalone: true,
  imports: [MatTableModule, DatePipe, CommonModule],
  templateUrl: './scheduling.component.html',
  styleUrls: ['./scheduling.component.scss']
})
export class ScheduleComponent implements OnInit {
  dataSource = new MatTableDataSource<any>([]);
  displayedColumns: string[] = [
    'vehicle',
    'driver',
    'route',
    'startTime',
    'endTime',
    'status'
  ];

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.loadSchedules();
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

  getStatusClass(status: string): string {
    const statusClassMap: { [key: string]: string } = {
      'Scheduled': 'status-scheduled',
      'In Progress': 'status-in-progress',
      'Completed': 'status-completed',
      'Cancelled': 'status-cancelled'
    };
    return statusClassMap[status as keyof typeof statusClassMap] || 'status-default';
  }
}