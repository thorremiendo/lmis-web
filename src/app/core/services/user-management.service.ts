import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

export interface User {
  id?: number;
  username: string;
  password?: string;
  email?: string;
  role: 'Admin' | 'LGU' | 'LGA' | 'Others';
  firstName: string;
  lastName: string;
  contactNumber: string;
  municipalityId?: number;
  barangayId?: number;
  createdAt?: Date;
  isActive?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class UserManagementService {
  constructor(private apiService: ApiService) {}

  createUser(userData: User): Observable<any> {
    const url = '/auth/users';
    return this.apiService.post(url, JSON.stringify(userData));
  }

  getAllUsers(): Observable<User[]> {
    const url = '/auth/users';
    return this.apiService.get(url);
  }

  getUserById(id: number): Observable<User> {
    const url = `/auth/users/${id}`;
    return this.apiService.get(url);
  }

  updateUser(id: number, userData: Partial<User>): Observable<User> {
    const url = `/auth/users/${id}`;
    return this.apiService.put(url, JSON.stringify(userData));
  }

  deleteUser(id: number): Observable<any> {
    const url = `/auth/users/${id}`;
    return this.apiService.delete(url);
  }
}
