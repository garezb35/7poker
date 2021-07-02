import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie';
import { AuthService } from '../../services/auth/auth.service';
import { AppConstants } from '../../constants';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authService.getCookie(AppConstants.currentUser)) {      
      return true;
    } else if (sessionStorage.getItem(AppConstants.currentUser)) {
      return true;
    }

    // this.router.navigate(['/home'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
