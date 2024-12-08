import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { AdminDashboardComponent } from './Admin/admin-dashboard/admin-dashboard.component';
import { authGuard } from './guard/auth.guard';
import { SidebarComponent } from './Admin/sidebar/sidebar.component';
import { FleetComponent } from './Admin/fleet/fleet.component';
import { DriverComponent } from './Admin/driver/driver.component';
import { CargoListComponent } from './Admin/cargo/cargo.component';
import { RouteComponent } from './Admin/route/route.component';
import { ScheduleComponent } from './Admin/scheduling/scheduling.component';
import { FuelLogsComponent } from './Admin/fuellogs/fuellogs.component';
import { MaintenanceComponent } from './Admin/maintenance/maintenance.component';
import { ReportComponent } from './Admin/report/report.component';
import { IncidentsComponent } from './Admin/incidents/incidents.component';
import { SidebarFleetComponent } from './FleetManager/sidebar-fleet/sidebar-fleet.component';
import { FleetManagerComponent } from './FleetManager/fleet-manager/fleet-manager.component';
import { FleetRouteComponent } from './FleetManager/fleet-route/fleet-route.component';
import { FleetScheduleComponent } from './FleetManager/fleet-schedule/fleet-schedule.component';
import { FleetFuellogsComponent } from './FleetManager/fleet-fuellogs/fleet-fuellogs.component';
import { FleetMaintenanceComponent } from './FleetManager/fleet-maintenance/fleet-maintenance.component';
import { FleetIncidentsComponent } from './FleetManager/fleet-incidents/fleet-incidents.component';
import { DriverSidebarComponent } from './Driver/driver-sidebar/driver-sidebar.component';
import { ProfileComponent } from './Driver/profile/profile.component';
import { MaintenanceSidebarComponent } from './MaintenanceStaff/maintenance-sidebar/maintenance-sidebar.component';
import { MaintenanceStaffComponent } from './MaintenanceStaff/maintenance-staff/maintenance-staff.component';
import { CustomerSidebarComponent } from './Customer/customer-sidebar/customer-sidebar.component';
import { CustomerCargoComponent } from './Customer/customer-cargo/customer-cargo.component';

export const routes: Routes = [
  { path: '', component: LandingpageComponent }, // Root route
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'admin-dashboard',
    component: SidebarComponent,
    canActivate: [authGuard], // Protect the route
    data: { role: 'Admin' }, // Role-based access
    children: [
      { path: '', redirectTo: '', pathMatch: 'full' }, // Default child route
      { path: '', component: AdminDashboardComponent }, // Dashboard Home
      { path: 'fleet', component: FleetComponent }, // Fleet Management
      { path: 'drivers', component: DriverComponent }, // Driver Management
      { path: 'cargo', component: CargoListComponent }, // Cargo Management
      { path: 'route', component: RouteComponent }, // Route Management
      { path: 'schedule', component: ScheduleComponent }, // Scheduling Management
      { path: 'fuel-logs', component: FuelLogsComponent }, // Fuel Logs
      { path: 'maintenance', component: MaintenanceComponent }, // Maintenance Logs
      { path: 'report', component: ReportComponent }, // Report
      { path: 'incidents', component: IncidentsComponent }, // Incidents
    ],
  },
  {
    path: 'fleet-dashboard',
    component: SidebarFleetComponent,
    canActivate: [authGuard], // Protect the route
    data: { role: 'FleetManager' }, // Role-based access
    children: [
      { path: '', redirectTo: '', pathMatch: 'full' }, // Default child route
      { path: '', component: FleetManagerComponent }, // Fleet Management
      { path: 'route', component: FleetRouteComponent }, // Route Management
      { path: 'schedule', component: FleetScheduleComponent }, // Scheduling Management
      { path: 'cargo', component: CargoListComponent }, // Cargo Management
      { path: 'fuel-logs', component: FleetFuellogsComponent }, // Fuel Logs
      { path: 'maintenance', component: FleetMaintenanceComponent }, // Maintenance Logs
      { path: 'incidents', component: FleetIncidentsComponent }, // Incidents
    ],
  },
  {
    path: 'driver-dashboard',
    component: DriverSidebarComponent,
    canActivate: [authGuard], // Protect the route
    data: { role: 'Driver' }, // Role-based access
    children: [
      { path: '', redirectTo: '', pathMatch: 'full' }, // Default child route
      { path: '', component: ProfileComponent }, // Fleet Management
      { path: 'fuel-logs', component: FleetFuellogsComponent }, // Fuel Logs
      { path: 'incidents', component: FleetIncidentsComponent }, // Incidents
    ],
  },
  {
    path: 'maintenance-dashboard',
    component: MaintenanceSidebarComponent,
    canActivate: [authGuard], // Protect the route
    data: { role: 'MaintenanceStaff' }, // Role-based access
    children: [
      { path: '', redirectTo: 'maintenance', pathMatch: 'full' }, // Default child route
      { path: 'maintenance', component: MaintenanceStaffComponent },
    ],
  },
  {
    path: 'customer-dashboard',
    component: CustomerSidebarComponent,
    canActivate: [authGuard], // Protect the route
    data: { role: 'Customer' }, // Role-based access
    children: [
      { path: '', redirectTo: '', pathMatch: 'full' }, // Default child route
      { path: '', component: CustomerCargoComponent }, // Profile
    ],
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }, // Fallback for undefined routes
];
