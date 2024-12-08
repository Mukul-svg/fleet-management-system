import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardService } from '../../Services/Admin-Dashboard/admin-dashboard.service';
interface Cargo {
  _id: string;
  dimensions: {
    length: number;
    width: number;
    height: number;
  };
  description: string;
  weight: number;
  type: string;
  destination: string;
  customer: {
    _id: string;
    username: string;
    email: string;
  };
  deliveryStatus: 'Pending' | 'In Transit' | 'Delivered';
  specialInstructions: string;
  createdAt: string;
  updatedAt: string;
}

@Component({
  selector: 'app-cargo-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cargo.component.html',
  styleUrls: ['./cargo.component.scss']
})
export class CargoListComponent implements OnInit {
  categories: {[key: string]: Cargo[]} = {
    'Pending': [],
    'In Transit': [],
    'Delivered': []
  };
  activeTab: string = 'Pending';
  Object = Object;  
  constructor(private dashboardService: DashboardService) {}

  ngOnInit() {
    this.fetchCargos();
  }

  fetchCargos() {
    this.dashboardService.getCargos().subscribe({
      next: (cargos) => {
        this.categories = {
          'Pending': cargos.filter((cargo: Cargo) => cargo.deliveryStatus === 'Pending'),
          'In Transit': cargos.filter((cargo: Cargo) => cargo.deliveryStatus === 'In Transit'),
          'Delivered': cargos.filter((cargo: Cargo) => cargo.deliveryStatus === 'Delivered')
        };
      },
      error: (error) => {
        console.error('Error fetching cargos', error);
      }
    });
  }

  handleApprove(cargoId: string) {
    this.dashboardService.updateCargoStatus(cargoId).subscribe({
      next: (updatedCargo) => {
        this.fetchCargos(); // Refresh the list after update
      },
      error: (error:any) => {
        console.error('Error updating cargo status', error);
      }
    });
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }
}