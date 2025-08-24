import { Injectable } from '@angular/core';
import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const user = JSON.parse(localStorage.getItem('lmisUser') || '{}');
    
    if (user.role === 'Admin') {
      return true;
    }
    
    this.router.navigate(['/dashboard'], { queryParams: { message: 'Access denied. Admin privileges required.' } });
    return false;
  }
}
