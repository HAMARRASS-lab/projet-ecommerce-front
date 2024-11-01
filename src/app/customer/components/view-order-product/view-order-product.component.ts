import { CustomerService } from './../../services/customer.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-order-product',
  templateUrl: './view-order-product.component.html',
  styleUrls: ['./view-order-product.component.scss']
})
export class ViewOrderProductComponent implements OnInit {

  orderId: any = this.activatedRoute.snapshot.params['orderId'];
  orderedProductDetailsList = [];
  totalAmount: any;

  constructor(private activatedRoute:ActivatedRoute, private customerService: CustomerService) { }

  ngOnInit(): void {
    this.getOrdredProductsDetailsByOrderId();
  }

getOrdredProductsDetailsByOrderId(){
  this.customerService.getOrderedProducts(this.orderId).subscribe(res=>{
    res.productDtoList.array.array.forEach(element => {
      element.processedImg = 'data:image/jpeg;base64,'+ element.byteImg;
      this.orderedProductDetailsList.push(element);
    });

    this.totalAmount = res.orderAmount;
  })
}

}
