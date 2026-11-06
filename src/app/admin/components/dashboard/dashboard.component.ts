import { AdminService } from './../../service/admin.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { apiErrorMessage } from 'src/app/shared/api-error';
import { confirmDelete } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { categoryNames, filterProducts, ProductFilterCriteria } from 'src/app/shared/product-filters/product-filter';

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
    private dialog: MatDialog,
  ){}
  allProducts: any[] = [];
  products: any[] = [];
  categories: string[] = [];
  searchProductForm! :  FormGroup;

  criteria: ProductFilterCriteria = {};
  filteredCount = 0;
  pageIndex = 0;
  pageSize = 12;
  readonly pageSizeOptions = [6, 12, 24];

  ngOnInit() {
    this.searchProductForm=this.fb.group({
         title: [null]
    });
    this.getAllProducts();
  }

  getAllProducts(){
    this.AdminService.getAllProducts().subscribe(res=>this.showProducts(res));
  }

  submitForm(){
    const title= this.searchProductForm.get('title')!.value?.trim();
    if(!title){
      this.getAllProducts();
      return;
    }
    this.AdminService.getAllProductByName(title).subscribe(res=>this.showProducts(res));
  }

  onCriteriaChange(criteria: ProductFilterCriteria){
    this.criteria = criteria;
    this.pageIndex = 0;
    this.updatePage();
  }

  onPage(event: PageEvent){
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePage();
  }

  private showProducts(products: any[]){
    products.forEach(element=>{
      element.processedImg='data:image/jpeg;base64,' +element.byteImg;
    });
    this.allProducts = products;
    this.categories = categoryNames(products);
    this.updatePage();
  }

  private updatePage(){
    const filtered = filterProducts(this.allProducts, this.criteria);
    this.filteredCount = filtered.length;
    const lastPage = Math.max(Math.ceil(filtered.length / this.pageSize) - 1, 0);
    this.pageIndex = Math.min(this.pageIndex, lastPage);
    const start = this.pageIndex * this.pageSize;
    this.products = filtered.slice(start, start + this.pageSize);
  }

  deleteProduct(product: any){
    confirmDelete(this.dialog, `Delete product ${product.name}?`).subscribe(()=>{
      this.AdminService.deleteProduct(product.id).subscribe(()=>{
        this.snackBar.open('Product Deleted Successfully', 'Close',{
          duration:5000
        });
        // Reloads through the search so an active keyword isn't lost.
        this.submitForm();
      }, error=>{
        this.snackBar.open(apiErrorMessage(error, 'Could not delete this product'), 'Close', {
          duration: 5000,
          panelClass: 'error-snackbar'
        });
      })
    })
  }

}
