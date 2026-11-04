import { CustomerService } from './../../services/customer.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.scss']
})
export class PlaceOrderComponent implements OnInit {

  orderForm!:FormGroup;
  submitting = false;
  
  constructor(
    private fb: FormBuilder,
    private snackBar:MatSnackBar,
    private customerService: CustomerService,
    private router: Router,
    public dialogRef: MatDialogRef<PlaceOrderComponent>
  ) { }

  ngOnInit(): void {

    this.orderForm = this.fb.group({
      address: [null, [Validators.required]],
      orderDescription: [null],
      paymentMethod: ['CASH']
    })
  }

 
  

  placeOrder(){
    const { paymentMethod, ...order } = this.orderForm.value;
    this.submitting = true;
    if(paymentMethod === 'CARD'){
      this.payByCard(order);
    }else{
      this.payOnDelivery(order);
    }
  }

  private payByCard(order: any){
    this.customerService.createCheckoutSession(order).subscribe(res =>{
      window.location.assign(res.url);
    }, () =>{
      this.submitting = false;
      this.snackBar.open("Card payment is not available right now","Close",{duration:5000});
    })
  }

  private payOnDelivery(order: any){
    this.customerService.placeOreder(order).subscribe(res =>{
      if(res.id != null){
          this.snackBar.open("Order placed successfully", "Close",{duration:5000})
          this.router.navigateByUrl("/customer/my_orders");
          this.closeForm();
      }else{
        this.submitting = false;
        this.snackBar.open("Something went wrong","Close",{duration:5000})
      }
    }, () =>{
      this.submitting = false;
      this.snackBar.open("Something went wrong","Close",{duration:5000})
    })
  }

  closeForm() {
    this.dialogRef.close();
  }

}
