import { AdminService } from './../../service/admin.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-coupons',
  templateUrl: './coupons.component.html',
  styleUrls: ['./coupons.component.scss']
})
export class CouponsComponent implements OnInit {

  coupons: any;

  constructor(private AdminService:AdminService) { }

  ngOnInit(){
    this.getCoupons();
  }

  getCoupons(){
    this.AdminService.getCoupons().subscribe(res=>{
      this.coupons=res;
    })
  }

}
