import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { UserStorageService } from '../services/storage/user-storage.service';

/** Keeps signed-in users away from the login and sign-up pages. */
@Injectable({
  providedIn: 'root'
})
export class GuestGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(): boolean | UrlTree {
    const home = UserStorageService.getHomeUrl();
    return home === '/login' ? true : this.router.parseUrl(home);
  }
}
