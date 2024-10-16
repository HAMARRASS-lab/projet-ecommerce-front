import { ActivatedRoute } from '@angular/router';
import { CustomerService } from './../services/customer.service';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

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

}
