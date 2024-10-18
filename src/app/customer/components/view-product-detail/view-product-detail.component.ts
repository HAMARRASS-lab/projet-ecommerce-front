import { ActivatedRoute } from '@angular/router';
import { CustomerService } from '../../services/customer.service';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserStorageService } from 'src/app/services/storage/user-storage.service';

@Component({
  selector: 'app-view-product-detail',
  templateUrl: './view-product-detail.component.html',
  styleUrls: ['./view-product-detail.component.scss']
})
export class ViewProductDetailComponent implements OnInit {

  productId: number= this.activatedRoute.snapshot.params["productId"];
  product : any;
  FAQS: any[]=[];
  reviews: any[] =[];

  constructor(private snackBar: MatSnackBar,
    private customerService:CustomerService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getProductdDetailById();
  }

  getProductdDetailById(){
    this.customerService.getProductDetailById(this.productId).subscribe(res =>{
      this.product=res.productDto;
      this.product.processedImg= 'data:image/png;base64,' + res.prductDto.byteImg;

      this.FAQS=res.faqDtoList;
      res.reviewDtoList.array.array.forEach(element => {
        element.processedImg='data:image/png;base64,' + element.returnedImg;
        this.reviews.push(element);
      });

    })
  }

addToWishlist(){
  const wishListDto={
  productId: this.productId,
  userId: UserStorageService.getUserId(),
  }
  this.customerService.addProductToWishlist(wishListDto).subscribe(res=>{
   if(res.is!=null){
    this.snackBar.open('Product added to wishlist successfully!', 'Close',{
    duration : 5000
    });
   }else{
    this.snackBar.open("Already in wishlist", 'ERROR',{
     duration:5000
    });
   }
  })
}


}
