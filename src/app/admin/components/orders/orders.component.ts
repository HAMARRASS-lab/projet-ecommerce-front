import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminService } from './../../service/admin.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {


  order: any;

  constructor(
    private AdminService: AdminService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {

    this.getPlacedOrders();
  }

  getPlacedOrders(){
    this.AdminService.getPlaceOrders().subscribe(res=>{
      this.order = res;
    })
  }
  chengeOrderStatus(orderId: number, status:string){
    this.AdminService.chengeOrderStatus(orderId,status).subscribe(res=>{
      if(res.id != null){
        this.snackBar.open("order status changed successfully", "Close",{duration:5000});
        this.getPlacedOrders();
      }else{
        this.snackBar.open("Something went wrong", "Close", {duration:5020})
      }
    })
  }
}
