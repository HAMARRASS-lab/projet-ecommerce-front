import { AdminService } from './../../service/admin.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-prtoduct-faq',
  templateUrl: './post-prtoduct-faq.component.html',
  styleUrls: ['./post-prtoduct-faq.component.scss']
})
export class PostPrtoductFaqComponent implements OnInit {

  productId:number=this.activatedRoute.snapshot.params["productId"];
  FAQForm!: FormGroup;

  constructor( private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private AdminService : AdminService,
    private activatedRoute: Activatedroute
  ) { }

  ngOnInit(): void {
     this.FAQForm=this.fb.group({
      question:[null, [Validators.required]],
      answer:[null,[Validators.required]],
     })
  }
  postFAQ(){
    this.AdminService.postFAQ(this.productId, this.FAQForm.value).subscribe(res=>{
      if(res.is!=null){
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
