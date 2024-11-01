import { AdminService } from './../../service/admin.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router ,ActivatedRoute} from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
selector: 'app-post-prtoduct-faq',
templateUrl: './post-product-faq.component.html',
styleUrls: ['./post-product-faq.component.scss']
})
export class PostPrtoductFaqComponent implements OnInit {

productId:number = this.activatedRoute.snapshot.params["productId"];
FAQForm!: FormGroup;

constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackBar:MatSnackBar,
    private adminService : AdminService,
    private activatedRoute: ActivatedRoute
) { }

ngOnInit(): void {
this.FAQForm = this.fb.group({
        question: [null, [Validators.required]],
answer: [null,[Validators.required]],
})
}
postFAQ(){
this.adminService.postFAQ(this.productId, this.FAQForm.value).subscribe(res=>{
if(res.id!=null){
    this.snackBar.open('FAQ Posted Successfully!', 'Close', {
            duration:5000
});
    this.router.navigateByUrl('/admin/dashboard');
}else{
    this.snackBar.open("Something went wrong", 'Close',{
            duration:5030,
            panelClass:'error-snackbar'
});
}
})
}

}