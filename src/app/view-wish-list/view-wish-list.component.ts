import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../customer/services/customer.service';

@Component({
  selector: 'app-view-wish-list',
  templateUrl: './view-wish-list.component.html',
  styleUrls: ['./view-wish-list.component.scss']
})
export class ViewWishListComponent implements OnInit {

  products: any[] = [];

  constructor(private customerService: CustomerService) { }

  ngOnInit(): void {
    this.getWishlistByUserId();
  }
  
getWishlistByUserId(){
  this.customerService.getWishlistByUserId().subscribe(res=>{
    res.forEach(element => {
      element.processedImg='data:image/jpeg;base64,' +element.returnedImg;
      this.products.push(element)
    });
  })
}
}
