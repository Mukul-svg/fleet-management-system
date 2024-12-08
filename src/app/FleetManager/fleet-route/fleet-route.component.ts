import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DashboardService } from '../../Services/Admin-Dashboard/admin-dashboard.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
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
}

interface Vehicle {
  _id: string;
  licensePlate: string;
}

@Component({
  selector: 'app-fleet-route',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './fleet-route.component.html',
  styleUrls: ['./fleet-route.component.scss'],
})
export class FleetRouteComponent implements OnInit {
  routes: Route[] = [];
  vehicles: Vehicle[] = [];
  createRouteForm: FormGroup;
  isFormVisible = false;

  constructor(private dashboardService: DashboardService, private fb: FormBuilder) {
    this.createRouteForm = this.fb.group({
      RouteId: ['', Validators.required],
      Source: ['', Validators.required],
      Destination: ['', Validators.required],
      Distance: ['', [Validators.required, Validators.min(0)]],
      EstimatedTime: ['', [Validators.required, Validators.min(0)]],
      VehicleId: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.fetchRoutes();
    this.fetchVehicles();
  }

  fetchRoutes(): void {
    this.dashboardService.getRoutes()
      .pipe(catchError(error => {
        console.error('Error fetching routes', error);
        return of([]);
      }))
      .subscribe((routes: Route[]) => {
        console.log('Fetched routes:', routes); // Debugging log
        this.routes = routes;
      });
  }

  fetchVehicles(): void {
    this.dashboardService.fetchVehicles()
      .pipe(catchError(error => {
        console.error('Error fetching vehicles', error);
        return of([]);
      }))
      .subscribe((vehicles: Vehicle[]) => {
        console.log('Fetched vehicles:', vehicles); // Debugging log
        this.vehicles = vehicles;
      });
  }

  toggleForm(): void {
    this.isFormVisible = !this.isFormVisible;
  }

  onSubmit(): void {
    if (this.createRouteForm.valid) {
      const formData = this.createRouteForm.value;

      this.dashboardService.createRoute(formData).subscribe({
        next: () => {
          this.createRouteForm.reset();
          this.fetchRoutes();
          this.isFormVisible = false;
          // Optionally display a success message
        },
        error: (err) => {
          console.error('Error creating route:', err);
          // Optionally display an error message
        },
      });
    } else {
      this.createRouteForm.markAllAsTouched();
    }
  }

  getVehicleLicensePlate(vehicle: Route['VehicleId']): string {
    return vehicle ? vehicle.licensePlate : 'N/A';
  }
}