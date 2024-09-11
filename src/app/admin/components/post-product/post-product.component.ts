import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from '../../service/admin.service';

@Component({
  selector: 'app-post-product',
  templateUrl: './post-product.component.html',
  styleUrls: ['./post-product.component.scss']
})
export class PostProductComponent implements OnInit {

  productForm : FormGroup;
  listofCategories:any=[];
  selectedFile : File | null;
  imagePreview : string | ArrayBuffer | null;

  constructor( 
    private fb: FormBuilder,
    private router:Router,
    private MatSnackBar:MatSnackBar,
    private adminService:AdminService
    ) {}

 

  onFileSelected(event:any){
    this.selectedFile=event.target.files[0];
    this.previewImage();
  }
   previewImage(){
    const reader = new FileReader();
    reader.onload=()=>{
    this.imagePreview=reader.result;
    }

    reader.readAsDataURL(this.selectedFile);
   }

   ngOnInit() {

    this.productForm=this.fb.group({
      categoryId:[null, [Validators.required]],
      name:[null, [Validators.required]],
      price:[null, [Validators.required]],
      description:[null, [Validators.required]],
    });
    this.getAllCategories();
  }
  getAllCategories(){
    this.adminService.getAllCategory().subscribe(res=>{
      this.listofCategories=res;
    })
  }

  addProduct() :void{
    if(this.productForm.valid){
       const formData:FormData=new FormData();
       formData.append('img', this.selectedFile);
       formData.append('categoryId', this.productForm.get('categoryId').value);
       formData.append('name', this.productForm.get('name').value);
       formData.append('description', this.productForm.get('description').value);
       formData.append('price', this.productForm.get('price').value);
       this.adminService.addProduct(formData).subscribe((res)=>{
           if(res.id !=null){
            this.MatSnackBar.open('Product Posted Successfully', 'Close',{
              duration:5000
            });
            this.router.navigateByUrl('/admin/dashboard');
           }else{
            this.MatSnackBar.open(res.message, 'ERROR', {
              duration:5000
            });
           }
       })
    }else{
      for(const i in this.productForm.controls){
        this.productForm.controls[i].markAsDirty();
        this.productForm.controls[i].updateValueAndValidity();
      }
    }

  }

}
