import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private apiService: ApiService, private router: Router) { }

  login(body) {
    const url = `/auth/login`;
    return this.apiService.post(url, body);
  }

  register(body) {
    const url = `/auth/register`;
    return this.apiService.post(url, body);
  }

  logout() {
    localStorage.clear()
    this.router.navigate(['/auth/login']);
  }
}
