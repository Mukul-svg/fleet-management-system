import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private apiUrl = 'https://fleet-backend-nu.vercel.app/api';  // Replace with your API endpoint

  constructor(private http: HttpClient) {}

  // Get dashboard data
  getTotalDrivers(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/reports/total-data`);
  }

  fetchVehicles(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/vehicles`);
  }

  createVehicle(vehicleData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/vehicles`, vehicleData);
  }

  fetchDrivers(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/drivers`);
  }

  fetchEligibleUsers(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/users/drivers`);
  }

  createDriver(driverData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/drivers`, driverData);
  }

  getCargos(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/cargo/allcargo`);
  }

  updateCargoStatus(cargoId: string): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/cargo/${cargoId}/status`, {});
  }

  getRoutes(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/route`);
  }

  createRoute(routeData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/route`, routeData);
  }

  getSchedules(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/schedules/all`);
  }

  getFuelLogs(): Observable<any> {
    return this.http.get(`${this.apiUrl}/fuel-logs/all`);
  }
  createFuelLog(fuelLog: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/fuel-logs`, fuelLog);
  }
  getMaintenanceLogs(): Observable<any> {
    return this.http.get(`${this.apiUrl}/maintenance/all`);
  }

  generateReport(type: string, startDate: string, endDate: string, parameters: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/reports`, { type, startDate, endDate, parameters });
  }

  getIncidents(): Observable<any> {
    return this.http.get(`${this.apiUrl}/incidents/all`);
  }
  createSchedule(scheduleData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/schedules`, scheduleData);
  }

  getUsers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/users/allusers`);
  }

  getDriverProfile(driverId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/drivers/profile`);
  }

  getAllMaintenanceRecords(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/maintenance/all`);
  }

  scheduleMaintenance(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/maintenance`, data);
  }

  updateMaintenanceStatus(maintenanceId: string, status: string): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/maintenance/${maintenanceId}/status`, { status });
  }

  getCargoByCustomer(customerId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/cargo/customer/${customerId}`);
  }

  createCargo(cargoData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/cargo`, cargoData);
  }

  reportIncident(incidentData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/incidents`, incidentData);
  }

  updateIncidentStatus(incidentId: string, resolutionStatus: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/incidents/${incidentId}/status`, { resolutionStatus });
  }

}