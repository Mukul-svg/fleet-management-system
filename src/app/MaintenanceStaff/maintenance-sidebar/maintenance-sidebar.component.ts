import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-maintenance-sidebar',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './maintenance-sidebar.component.html',
  styleUrls: ['./maintenance-sidebar.component.scss']
})
export class MaintenanceSidebarComponent {
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