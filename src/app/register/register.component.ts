import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule, RouterLink]
})
export class RegisterComponent {
  roles = ['Admin', 'FleetManager', 'Driver', 'MaintenanceStaff', 'Customer'];
  signupForm: FormGroup;

  constructor() {
    this.signupForm = new FormGroup({
      username: new FormControl('', Validators.required),
      phoneno: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')]),
      role: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }

  onSubmit() {
    if (this.signupForm.valid) {
      console.log(this.signupForm.value);
    }
  }
}
