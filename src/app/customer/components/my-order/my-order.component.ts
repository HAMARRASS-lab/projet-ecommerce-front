import { CustomerService } from './../../services/customer.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-order',
  templateUrl: './my-order.component.html',
  styleUrls: ['./my-order.component.scss']
})
export class MyOrderComponent implements OnInit {

  myOrders:any;
  constructor(private CustomerService: CustomerService) { }

  ngOnInit(): void {
    this.getMyOrder();
  }

  getMyOrder(){
    this.CustomerService.OrederByUserId().subscribe(res=>{
      this.myOrders=res;
    })
  }

}
