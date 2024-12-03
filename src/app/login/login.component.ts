import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [FormsModule, RouterLink]
})
export class LoginComponent {
  loginObj:any = {
    email: '',
    password: ''
  };

  http=inject(HttpClient);

  constructor (private router: Router) {

  }

  onlogin(){
    this.http.post('http://localhost:3000/api/users/login', this.loginObj).subscribe((data:any)=>{
      if (data.token) {
        localStorage.setItem('token', data.token);
        this.router.navigateByUrl('admin-dashboard');
      }
      else { alert('Invalid credentials'); }
    });
  }
}