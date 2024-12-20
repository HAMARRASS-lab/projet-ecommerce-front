import { CustomerService } from './../../services/customer.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-order',
  templateUrl: './my-order.component.html',
  styleUrls: ['./my-order.component.scss']
})
export class MyOrderComponent implements OnInit {

  myOrder: any;
  constructor(private customerService: CustomerService) { }

  ngOnInit(): void {
    this.getMyOrder();
  }

  getMyOrder() {
    this.customerService.getOrdersByUserId().subscribe(res => {
      this.myOrder = res;
    })
  }

}
