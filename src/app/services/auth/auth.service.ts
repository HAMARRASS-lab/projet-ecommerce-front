import { UserStorageService } from './../storage/user-storage.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

const BASIC_URL="http://localhost:8080/";
const AUTH_HEADER= 'authorization';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http : HttpClient, private userStorageService:UserStorageService) { }


  register(signupRequest: any): Observable<any> {
    return this.http.post(BASIC_URL + "sign-up", signupRequest).pipe(
      map((response: any) => {
        console.log('Registration Response:', response);
        return response; // You might want to modify this based on your backend response structure
      })
    );
  }
  

 login(username:string, password:string):any{
  const headers = new HttpHeaders().set('Content-type', 'application/json');
  const body = {username,password};
  return this.http.post(BASIC_URL+ 'authenticate',body, {headers, observe:'response'}).pipe(
    map((res)=>{
       const token = res.headers.get('authorization').substring(7);
       const user = res.body;
       if(token && user ){
          this.userStorageService.saveToken(token);
          this.userStorageService.saveUser(JSON.stringify(user));
          return true
       }
       return false;
    })
  )
}

getOrderByTrackingId(trackingId: number): Observable<any>{
  return this.http.get(BASIC_URL+ `order/${trackingId}`);
}
} 
