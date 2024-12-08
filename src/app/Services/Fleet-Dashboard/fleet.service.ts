import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FleetService {

  private apiUrl = 'http://localhost:3000/api';  // Replace with your API endpoint

  constructor(private http: HttpClient) {}

  
}
