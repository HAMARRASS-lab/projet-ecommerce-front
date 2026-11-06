import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../service/admin.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { apiErrorMessage } from 'src/app/shared/api-error';

/** Adds a category, or edits one when the route has a categoryId. */
@Component({
  selector: 'app-post-category',
  templateUrl: './post-category.component.html',
  styleUrls: ['./post-category.component.scss']
})
export class PostCategoryComponent implements OnInit {

  categoryId: number = this.route.snapshot.params['categoryId'];
  categoryForm!: FormGroup;


  constructor(

    private fb: FormBuilder,
    private router:Router,
    private route: ActivatedRoute,
    private snackBar:MatSnackBar,
    private adminService: AdminService
  ) { }

  ngOnInit(){
    this.categoryForm=this.fb.group({
      name: [null,[Validators.required]],
      description: [null,[Validators.required]],
    })
    if(this.categoryId){
      this.adminService.getCategoryById(this.categoryId).subscribe(res=>{
        this.categoryForm.patchValue(res);
      }, error=>this.showError(apiErrorMessage(error, 'Could not load this category')))
    }
  }

  saveCategory(): void{
    if(this.categoryForm.invalid){
      this.categoryForm.markAllAsTouched();
      return;
    }
    const request = this.categoryId
      ? this.adminService.updateCategory(this.categoryId, this.categoryForm.value)
      : this.adminService.addCategory(this.categoryForm.value);

    request.subscribe((res) =>{
      if(res.id !=null){
        this.snackBar.open(this.categoryId ? 'Category updated successfully' : 'Category posted successfully', 'Close',{
          duration:5000
        });

        this.router.navigateByUrl('/admin/categories');
      }else{
        this.showError(res.message);
      }
    }, error=>this.showError(apiErrorMessage(error, 'Could not save this category')))
  }

  private showError(message: string){
    this.snackBar.open(message, 'Close',{
      duration:5000,
      panelClass: 'error-snackbar'
    });
  }
}
