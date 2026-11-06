import { AdminService } from './../../service/admin.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { apiErrorMessage } from 'src/app/shared/api-error';
import { confirmDelete } from 'src/app/shared/confirm-dialog/confirm-dialog.component';

@Component({
selector: 'app-post-prtoduct-faq',
templateUrl: './post-product-faq.component.html',
styleUrls: ['./post-product-faq.component.scss']
})
export class PostPrtoductFaqComponent implements OnInit {

productId:number = this.activatedRoute.snapshot.params["productId"];
FAQForm!: FormGroup;
faqs: any[] = [];
editingId: number | null = null;

constructor(
    private fb: FormBuilder,
    private snackBar:MatSnackBar,
    private dialog: MatDialog,
    private adminService : AdminService,
    private activatedRoute: ActivatedRoute
) { }

ngOnInit(): void {
    this.FAQForm = this.fb.group({
        question: [null, [Validators.required]],
        answer: [null,[Validators.required]],
    })
    this.getFAQs();
}

getFAQs(){
    this.adminService.getFAQs(this.productId).subscribe(res=>{
        this.faqs=res;
    }, error=>this.showError(apiErrorMessage(error, 'Could not load the FAQs')))
}

edit(faq: any){
    this.editingId=faq.id;
    this.FAQForm.patchValue(faq);
}

resetForm(form: FormGroupDirective){
    this.editingId=null;
    form.resetForm();
}

saveFAQ(form: FormGroupDirective){
    if(this.FAQForm.invalid){
        this.FAQForm.markAllAsTouched();
        return;
    }
    const request = this.editingId
        ? this.adminService.updateFAQ(this.editingId, this.FAQForm.value)
        : this.adminService.postFAQ(this.productId, this.FAQForm.value);

    request.subscribe(res=>{
        if(res.id!=null){
            this.snackBar.open(this.editingId ? 'FAQ Updated Successfully!' : 'FAQ Posted Successfully!', 'Close', {
                duration:5000
            });
            this.resetForm(form);
            this.getFAQs();
        }else{
            this.showError('Something went wrong');
        }
    }, error=>this.showError(apiErrorMessage(error, 'Could not save this FAQ')))
}

deleteFAQ(faq: any, form: FormGroupDirective){
    confirmDelete(this.dialog, 'Delete this FAQ?').subscribe(()=>{
        this.adminService.deleteFAQ(faq.id).subscribe(()=>{
            this.snackBar.open('FAQ deleted successfully', 'Close', {duration:5000});
            if(this.editingId===faq.id){
                this.resetForm(form);
            }
            this.getFAQs();
        }, error=>this.showError(apiErrorMessage(error, 'Could not delete this FAQ')))
    })
}

private showError(message: string){
    this.snackBar.open(message, 'Close',{
        duration:5000,
        panelClass:'error-snackbar'
    });
}

}
