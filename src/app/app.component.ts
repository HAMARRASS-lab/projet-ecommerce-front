import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { UserStorageService } from './services/storage/user-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ECommerceWeb';

  isCustomerLoggedIn: boolean = UserStorageService.isCustomerLoggeedIn();
  isAdminLoggedIn: boolean = UserStorageService.isAdminLoggeedIn();

  constructor(private router: Router) {
    
  }

  ngOnInit():void{
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isCustomerLoggedIn = UserStorageService.isCustomerLoggeedIn();
        this.isAdminLoggedIn = UserStorageService.isAdminLoggeedIn();
      }
    });
  }
  logout() {
    UserStorageService.signOut();
    this.router.navigateByUrl('/login'); // Assurez-vous de commencer le chemin avec un '/'
  }
}
