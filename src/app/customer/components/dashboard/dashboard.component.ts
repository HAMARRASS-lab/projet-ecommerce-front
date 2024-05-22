import { CustomerService } from './../../services/customer.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    private customerService:CustomerService, 
    private fb:FormBuilder,
    private snackBar: MatSnackBar,
  ){}
  products: any[] =[];
  searchProductForm! :  FormGroup;

  ngOnInit(): void {

    this.getAllProducts();
    this.searchProductForm=this.fb.group({
         title: [null, [Validators.required]]
    })
   }

  getAllProducts(){
    this.products=[];
    this.customerService.getAllProducts().subscribe(res=>{
      res.forEach(element=>{
        element.processedImg='data:image/jpeg;base64,' +element.bytemg;
        this.products.push(element);
      });
      console.log(this.products)
    })

  }
     submitForm(){
      this.products=[];
      const title= this.searchProductForm.get('title')!.value;
      this.customerService.getAllProductByName(title).subscribe(res=>{
        res.forEach(element=>{
          element.processedImg='data:image/jpeg;base64,' +element.bytemg;
          this.products.push(element);
        });
        console.log(this.products)
      })
     }

     addToCart(id: any){
      
     }
}
