import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from './../../service/admin.service';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    private AdminService: AdminService, 
    private fb:FormBuilder,
    private snackBar: MatSnackBar,
  ){}
  products: any[] =[];
  searchProductForm! :  FormGroup;

  ngOnInit(){

    this.getAllProducts();
    this.searchProductForm=this.fb.group({
         title: [null, [Validators.required]]
    })
   }




  getAllProducts(){
    this.products=[];
    this.AdminService.getAllProducts().subscribe(res=>{
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
      this.AdminService.getAllProductByName(title).subscribe(res=>{
        res.forEach(element=>{
          element.processedImg='data:image/jpeg;base64,' +element.bytemg;
          this.products.push(element);
        });
        console.log(this.products)
      })
     }

     deleteProduct(productId:any){
      this.AdminService.deleteProduct(productId).subscribe(res=>{
        if(res.body==null){
          this.snackBar.open('Product Deleted Successfully', 'Close',{
            duration:5000
          })
      }else{
        this.snackBar.open(res.message, 'Close', {
          duration: 5000,
          panelClass: 'error-snackbar'
        })
      };
     })
    }

}
