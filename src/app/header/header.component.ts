import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  isLoggedIn: boolean = false;
  dashboardLink: string = '';

  ngOnInit() {
    this.checkLoginStatus();
  }

  checkLoginStatus() {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    this.isLoggedIn = !!token;

    if (role === 'Admin') {
      this.dashboardLink = '/admin-dashboard';
    } else if (role === 'FleetManager') {
      this.dashboardLink = '/fleet-dashboard';
    } else if (role === 'MaintenanceStaff') {
      this.dashboardLink = '/maintenance-dashboard';
    } else if (role === 'Customer') {
      this.dashboardLink = '/customer-dashboard';
    } else if (role === 'Driver') {
      this.dashboardLink = '/driver-dashboard';
    } else {
      this.dashboardLink = '/';
    }
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    this.isLoggedIn = false;
  }
}