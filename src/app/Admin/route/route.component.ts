// route.component.ts
import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../Services/Admin-Dashboard/admin-dashboard.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';
interface Route {
  _id: string;
  RouteId: string;
  Source: string;
  Destination: string;
  Distance: number;
  EstimatedTime: number;
  VehicleId: {
    currentLocation: {
      latitude: number;
      longitude: number;
    };
    _id: string;
    licensePlate: string;
  };
  createdAt: string;
  updatedAt: string;
  __v: number;
}

@Component({
  selector: 'app-route',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './route.component.html',
  styleUrls: ['./route.component.scss'],
})
export class RouteComponent implements OnInit {
  routes: Route[] = [];

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.fetchRoutes();
  }

  fetchRoutes(): void {
    this.dashboardService.getRoutes()
      .pipe(
        catchError(error => {
          console.error('Error fetching routes', error);
          return of([]); // Return an empty array in case of error
        })
      )
      .subscribe((routes: Route[]) => {
        this.routes = routes;
      });
  }
}