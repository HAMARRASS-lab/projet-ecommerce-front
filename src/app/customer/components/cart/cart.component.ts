import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  constructor(private customerService: CustomerService,
    private snackbar: MatSnackBar,
    private fb: FormBuilder
    public dialog :MatDialog
  ) { }

  ngOnInit() {

    this.getCart();
  }

   cartItems: any[] =[];
   order:any;
     

   getCart(){
    this.cartItems=[];
    this.customerService.getCartByUserId().subscribe(res=>{
      this.order=res;
      res.cartItems.forEach(element => {
        element.processedImg = 'data:image/jpeg;base64,'+ element.returnedImg;
        this.cartItems.push(element);
      });
    })
   }
}
