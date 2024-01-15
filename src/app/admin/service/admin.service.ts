import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserStorageService } from 'src/app/services/storage/user-storage.service';

const BASIC_URL="http://localhost:8080/";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private htttp: HttpClient) { }

  addCategory(categoryDto: any) : Observable<any>{
    return this.htttp.post(BASIC_URL+ 'api/admin/category',categoryDto,{
      headers: this.createAuthorizationHeader(),
    
    })

  }

  private createAuthorizationHeader(): HttpHeaders{

    return new HttpHeaders().set(
      'Authorization', 'Bearer' +UserStorageService.getToken()
    )
  }
}
