import { Injectable } from '@angular/core';


const TOKEN='ecom-token';
const USER='ecom-user';
@Injectable({
  providedIn: 'root'
})
export class UserStorageService {

  constructor() { }

  public saveToken(token: string):void{
    window.localStorage.removeItem(TOKEN);
    window.localStorage.setItem(TOKEN,token);
  }
  public saveUser(user: any):void{
    window.localStorage.removeItem(USER);
    window.localStorage.setItem(USER,JSON.stringify(user));
  }

  static getToken(): string{
    return localStorage.getItem(TOKEN);
  }
  static getUser(): any{
    return JSON.parse(localStorage.getItem(USER));
  }

  static getUserId(): string{
    const user=this.getUser();
    if(user==null){
      return '';
    }
    return user.userId;
  }
  static getUserRole(): string{
    const user=this.getUser();
    if(user==null){
      return '';
    }
    return user.role;
  }

  static isAdminLoggeedIn(): boolean{
    if(!this.getToken()){
      return false;
    }
    const role: string=this.getUserRole();
    return role=='ADMIN';
  }
  static isCustomerLoggeedIn(): boolean{
    if(!this.getToken()){
      return false;
    }
    const role: string=this.getUserRole();
    return role=='CUSTOMER';
  }

  /** Where this user belongs: their dashboard, or the login page. */
  static getHomeUrl(): string{
    if(this.isAdminLoggeedIn()){
      return '/admin/dashboard';
    }
    return this.isCustomerLoggeedIn() ? '/customer/dashboard' : '/login';
  }

  static signOut():void{
    window.localStorage.removeItem(TOKEN);
    window.localStorage.removeItem(USER);
  }
}