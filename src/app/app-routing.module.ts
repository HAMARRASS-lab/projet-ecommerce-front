import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { TrackOrderComponent } from './track-order/track-order.component';
import { GuestGuard } from './guards/guest.guard';
import { RoleGuard } from './guards/role.guard';

const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "login" },
  { path : "login", component: LoginComponent, canActivate: [GuestGuard]},
  { path : "signup", component: SignupComponent, canActivate: [GuestGuard]},
  { path : "order", component: TrackOrderComponent},
  { path: 'customer', canLoad: [RoleGuard], canActivate: [RoleGuard], data: { role: 'CUSTOMER' }, loadChildren: () => import('./customer/customer.module').then(m => m.CustomerModule) },
  { path: 'admin', canLoad: [RoleGuard], canActivate: [RoleGuard], data: { role: 'ADMIN' }, loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
