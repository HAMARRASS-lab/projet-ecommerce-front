import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, UrlTree } from '@angular/router';
import { UserStorageService } from '../services/storage/user-storage.service';

/**
 * Restricts a route to the role in its `data.role`.
 * canLoad stops the module being downloaded; canActivate is still needed
 * because canLoad is skipped once a lazy module has been loaded.
 */
@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate, CanLoad {

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): boolean | UrlTree {
    return this.check(route.data.role);
  }

  canLoad(route: Route): boolean | UrlTree {
    return this.check(route.data.role);
  }

  private check(role: string): boolean | UrlTree {
    if (UserStorageService.getToken() && UserStorageService.getUserRole() === role) {
      return true;
    }
    return this.router.parseUrl(UserStorageService.getHomeUrl());
  }
}
