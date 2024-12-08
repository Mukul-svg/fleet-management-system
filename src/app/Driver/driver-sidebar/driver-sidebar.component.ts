import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-driver-sidebar',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './driver-sidebar.component.html',
  styleUrls: ['./driver-sidebar.component.scss']
})
export class DriverSidebarComponent {
  isSidebarOpen = false;

  constructor(private router: Router) { }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  closeSidebar() {
    this.isSidebarOpen = false;
  }

  logout() {
    localStorage.removeItem('token'); // Remove the token
    this.router.navigate(['/']);
  }
}