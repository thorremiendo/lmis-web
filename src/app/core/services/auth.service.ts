import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private apiService: ApiService) { }

  login(body) {
    const url = `/auth/login`;
    return this.apiService.post(url, body);
  }

  register(body) {
    const url = `/auth/register`;
    return this.apiService.post(url, body);
  }
}
