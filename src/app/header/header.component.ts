import { Component } from '@angular/core';
import { RouterEvent, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  isLoggedIn: boolean = false;

  ngOnInit() {
    this.checkLoginStatus();
  }

  // Check token in localStorage
  checkLoginStatus() {
    const token = localStorage.getItem('token');
    this.isLoggedIn = !!token; // Convert to boolean
  }

  // Logout method
  logout() {
    localStorage.removeItem('token'); // Remove the token
    this.isLoggedIn = false; // Update the UI
  }
}