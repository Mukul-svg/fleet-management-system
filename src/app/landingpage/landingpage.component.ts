import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-landingpage',
  standalone: true,
  imports: [CommonModule, HeaderComponent, RouterLink],
  templateUrl: './landingpage.component.html',
  styleUrl: './landingpage.component.scss'
})
export class LandingpageComponent {
  features = [
    { title: 'Real-time Tracking', description: "Monitor your fleet's location and status in real-time" },
    { title: 'Maintenance Scheduling', description: 'Automate and optimize vehicle maintenance schedules' },
    { title: 'Fuel Management', description: 'Track and analyze fuel consumption for cost savings' }
  ];
}
