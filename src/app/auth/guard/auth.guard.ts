import { Injectable, inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

import { CanActivate, CanActivateFn, CanLoad, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

// export const authGuardFn: CanActivateFn = () => {
//   const _authService = inject(AuthService);
//   const router = inject(Router);
  
//   const token = _authService.login('email', 'password');
//   if(!token) {
//     router.navigate(['/auth/login']);
//     return false;
//   }
//   return true;
// }

@Injectable({
  providedIn: 'root',
})


export class AuthGuard implements CanActivate, CanLoad {

  constructor( private _authService: AuthService, private _router: Router){}

  canActivate(): Observable<boolean | UrlTree> | boolean {
    if(this._authService.auth.token)
    {
      return true;
    } else{
      this._router.navigate(['/auth/login']);
    }    
    return false;
    
  }

  canLoad(): Observable<boolean> | boolean {
    if(this._authService.auth.token)
    {
      return true;
    } else {
      this._router.navigate(['/auth/login']);
    }
    return false;
  }
}
