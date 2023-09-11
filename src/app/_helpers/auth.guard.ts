import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { TokenService } from '../_services/token.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(private router:Router, private tokenService: TokenService) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    if(this.tokenService.isLogged()){
      return true
    }

    return this.router.navigate(['login'])
  }
}
