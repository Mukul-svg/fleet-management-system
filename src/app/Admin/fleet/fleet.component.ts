import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../Services/Admin-Dashboard/admin-dashboard.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';

interface Vehicle {
  _id: string;
  make: string;
  model: string;
  licensePlate: string;
  currentLocation: {
    latitude: number;
    longitude: number;
  };
  status: 'Available' | 'In Use' | 'Maintenance' | 'Unavailable';
  year: number;
  fuelType: string;
  capacity: number;
}


@Component({
  selector: 'app-fleet',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './fleet.component.html',
  styleUrl: './fleet.component.scss',
})
export class FleetComponent implements OnInit {
  dataSource = new MatTableDataSource<Vehicle>([]);
  displayedColumns: string[] = [
    'make',
    'model',
    'licensePlate',
    'location',
    'status',
  ];

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.loadVehicles();
  }

  loadVehicles(): void {
    this.dashboardService.fetchVehicles().subscribe({
      next: (vehicles) => {
        this.dataSource.data = vehicles;
      },
      error: (err) => {
        console.error('Error fetching vehicles:', err);
      },
    });
  }

  getStatusColor(status: Vehicle['status']): string {
    const statusColorMap = {
      Available: 'bg-green-100 text-green-800',
      'In Use': 'bg-blue-100 text-blue-800',
      Maintenance: 'bg-yellow-100 text-yellow-800',
      Unavailable: 'bg-red-100 text-red-800',
    };
    return statusColorMap[status] || 'bg-gray-100 text-gray-800';
  }
}
