import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { DashboardService } from '../../Services/Admin-Dashboard/admin-dashboard.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    ReactiveFormsModule,
    MatCardModule,
    MatIconModule
  ],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
})
export class AdminDashboardComponent {
  cards = [
    {
      title: 'Total Drivers',
      icon: 'group',
      count: 0,
      color: 'text-sky-800',
    },
    {
      title: 'Pending Cargo',
      icon: 'inventory',
      count: 0,
      color: 'text-sky-800',
    },
    {
      title: 'Total Vehicles',
      icon: 'local_shipping',
      count: 0,
      color: 'text-sky-800',
    },
    {
      title: 'Open Incidents',
      icon: 'warning',
      count: 0,
      color: 'text-sky-800',
    },
  ];

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.getDashboardData();
  }

  getDashboardData(): void {
    this.dashboardService.getTotalDrivers().subscribe((data) => {
      this.cards[0].count = data.totalDrivers;
      this.cards[1].count = data.pendingCargo;
      this.cards[2].count = data.totalVehicles;
      this.cards[3].count = data.openIncidents;
    });
  }
}