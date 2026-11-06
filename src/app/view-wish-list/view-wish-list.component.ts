import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomerService } from '../customer/services/customer.service';
import { apiErrorMessage } from '../shared/api-error';

@Component({
  selector: 'app-view-wish-list',
  templateUrl: './view-wish-list.component.html',
  styleUrls: ['./view-wish-list.component.scss']
})
export class ViewWishListComponent implements OnInit {

  products: any[] = [];
  loaded = false;

  constructor(private customerService: CustomerService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getWishlistByUserId();
  }

  getWishlistByUserId(){
    this.customerService.getWishlistByUserId().subscribe(res=>{
      res.forEach(element => {
        element.processedImg='data:image/jpeg;base64,' +element.returnedImg;
      });
      this.products = res;
      this.loaded = true;
    })
  }

  remove(wishlistId: number){
    this.customerService.removeFromWishlist(wishlistId).subscribe(()=>{
      this.snackBar.open('Product removed from wishlist.', 'Close', {duration:5000});
      this.getWishlistByUserId();
    }, error=>{
      this.snackBar.open(apiErrorMessage(error, 'Could not remove product from wishlist'), 'Close', {duration:5000});
    })
  }
}
