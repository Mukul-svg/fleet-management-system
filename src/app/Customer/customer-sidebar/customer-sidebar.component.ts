import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-sidebar',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './customer-sidebar.component.html',
  styleUrls: ['./customer-sidebar.component.scss']
})
export class CustomerSidebarComponent {
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