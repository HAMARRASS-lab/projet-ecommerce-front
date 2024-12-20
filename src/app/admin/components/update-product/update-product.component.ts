import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../../service/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.scss']
})
export class UpdateProductComponent implements OnInit {

  productId = this.activatedroute.snapshot.params['productId'];
  productForm : FormGroup;
  listofCategories:any=[];
  selectedFile : File | null;
  imagePreview : string | ArrayBuffer | null;
  existingImage: string;
  imageChanged=false;

  constructor( 
    private fb: FormBuilder,
    private router:Router,
    private MatSnackBar:MatSnackBar,
    private adminService:AdminService,
    private activatedroute : ActivatedRoute
    ) {}

 

  onFileSelected(event:any){
    this.selectedFile=event.target.files[0];
    this.previewImage();
    this.imageChanged=true;
    this.existingImage=null;
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
    this.getProductById();
  }
  
  getAllCategories(){
    this.adminService.getAllCategories().subscribe(res=>{
      this.listofCategories=res;
    })
  }

  updateProduct() :void{
    if(this.productForm.valid){
       const formData:FormData  = new FormData();
       if(this.imageChanged && this.selectedFile){
        formData.append('imgg',this.selectedFile);
       }
      
       formData.append('categoryId', this.productForm.get('categoryId').value);
       formData.append('name', this.productForm.get('name').value);
       formData.append('description', this.productForm.get('description').value);
       formData.append('price', this.productForm.get('price').value);
       this.adminService.updateProduct(this.productId,formData).subscribe((res)=>{
           if(res.id !=null){
            this.MatSnackBar.open('Product Updated Successfully', 'Close',{
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

  getProductById(){
    this.adminService.getProductsById(this.productId).subscribe(res=>{
      this.productForm.patchValue(res);
      this.existingImage='data:image/jpeg;base64,'+res.byteImg;
    })
  }


}
