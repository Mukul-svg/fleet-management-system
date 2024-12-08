import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../Services/Admin-Dashboard/admin-dashboard.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  driverId: string = '';
  driver: any | null = null;
  isLoading: boolean = true;
  error: string = '';

  constructor(
    private dashboardService: DashboardService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.dashboardService.getDriverProfile(this.driverId).subscribe({
      next: (data) => {
        this.driver = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching driver profile:', err);
        this.error = 'Failed to load driver profile.';
        this.isLoading = false;
      },
    });
  }
}
