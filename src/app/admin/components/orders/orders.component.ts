import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminService } from './../../service/admin.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {


  orders: any;

  constructor(private AdminService:AdminService,private snackBar: MatSnackBar) { }

  ngOnInit(): void {

    this.getPlacedOrders();
  }

  getPlacedOrders(){
    this.AdminService.getPlaceOrders().subscribe(res=>{
      this.orders=res;
    })
  }

}
