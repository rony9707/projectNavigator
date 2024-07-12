import { ActivatedRouteSnapshot, CanActivate, CanDeactivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";

import { Observable } from "rxjs";
import { Inject, Injectable } from "@angular/core";
import { inject } from "@angular/core/testing";


@Injectable({
  providedIn: 'root'
})

export class AuthGuardService implements CanActivate {

  router:Router=Inject(Router)
    
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let localStorageKey = 'jsonData_Project';
    const data = localStorage.getItem(localStorageKey);

    if (data !== null && data !== '') {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }

  }
}