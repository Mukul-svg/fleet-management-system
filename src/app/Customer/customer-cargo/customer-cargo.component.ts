// fleet-management-system/src/app/Customer/customer-cargo/customer-cargo.component.ts

import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../Services/Admin-Dashboard/admin-dashboard.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';

interface Cargo {
  _id: string;
  description: string;
  weight: number;
  dimensions: {
    length: number;
    width: number;
    height: number;
  };
  type: string;
  destination: string;
  customer: {
    _id: string;
    username: string;
    email: string;
  };
  deliveryStatus: string;
  specialInstructions: string;
  createdAt: string;
  updatedAt: string;
}

@Component({
  selector: 'app-customer-cargo',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, MatTableModule],
  templateUrl: './customer-cargo.component.html',
  styleUrls: ['./customer-cargo.component.scss'],
})
export class CustomerCargoComponent implements OnInit {
  cargos: Cargo[] = [];
  createCargoForm: FormGroup;
  displayedColumns: string[] = ['description', 'weight', 'type', 'destination', 'status'];
  isFormVisible: boolean = false;

  constructor(
    private dashboardService: DashboardService,
    private fb: FormBuilder
  ) {
    this.createCargoForm = this.fb.group({
      description: ['', Validators.required],
      weight: ['', [Validators.required, Validators.min(0)]],
      dimensions: this.fb.group({
        length: ['', [Validators.required, Validators.min(0)]],
        width: ['', [Validators.required, Validators.min(0)]],
        height: ['', [Validators.required, Validators.min(0)]],
      }),
      type: ['', Validators.required],
      destination: ['', Validators.required],
      specialInstructions: [''],
    });
  }

  ngOnInit(): void {
    const customerId = 'CUSTOMER_ID'; // Replace with actual customer ID logic
    this.loadCargos(customerId);
  }

  loadCargos(customerId: string): void {
    this.dashboardService.getCargoByCustomer(customerId).subscribe({
      next: (data) => {
        this.cargos = data;
      },
      error: (err) => {
        console.error('Error fetching cargos:', err);
      },
    });
  }

  toggleForm(): void {
    this.isFormVisible = !this.isFormVisible;
    if (!this.isFormVisible) {
      this.createCargoForm.reset();
    }
  }

  onSubmit(): void {
    if (this.createCargoForm.valid) {
      const customerId = 'CUSTOMER_ID'; // Replace with actual customer ID logic
      const formData = {
        ...this.createCargoForm.value
      };
      this.dashboardService.createCargo(formData).subscribe({
        next: () => {
          this.createCargoForm.reset();
          this.loadCargos(customerId);
        },
        error: (err) => {
          console.error('Error creating cargo:', err);
        },
      });
    }
  }
}