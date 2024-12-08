import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar-fleet',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './sidebar-fleet.component.html',
  styleUrls: ['./sidebar-fleet.component.scss']
})
export class SidebarFleetComponent {
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