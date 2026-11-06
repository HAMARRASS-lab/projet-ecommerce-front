import { AdminService } from './../../service/admin.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { apiErrorMessage } from 'src/app/shared/api-error';

/** Adds a coupon, or edits one when the route has a couponId. */
@Component({
  selector: 'app-post-coupon',
  templateUrl: './post-coupon.component.html',
  styleUrls: ['./post-coupon.component.scss']
})
export class PostCouponComponent implements OnInit {

  couponId: number = this.route.snapshot.params['couponId'];
  couponForm!: FormGroup;

  constructor(
    private fb:FormBuilder,
    private router:Router,
    private route: ActivatedRoute,
    private snackBar:MatSnackBar,
    private AdminService: AdminService

  ) { }

  ngOnInit(){
    this.couponForm=this.fb.group({
      name: [null, [Validators.required]],
      code: [null, [Validators.required]],
      discount: [null, [Validators.required, Validators.min(1), Validators.max(100)]],
      expirationDate: [null, [Validators.required]],

    })
    if(this.couponId){
      this.AdminService.getCouponById(this.couponId).subscribe(res=>{
        this.couponForm.patchValue({...res, expirationDate: new Date(res.expirationDate)});
      }, error=>this.showError(apiErrorMessage(error, 'Could not load this coupon')))
    }
  }

  saveCoupon(){
    if(this.couponForm.invalid){
      this.couponForm.markAllAsTouched();
      return;
    }
    const request = this.couponId
      ? this.AdminService.updateCoupon(this.couponId, this.couponForm.value)
      : this.AdminService.addCoupon(this.couponForm.value);

    request.subscribe(res=>{
      if(res.id != null){
        this.snackBar.open(this.couponId ? 'Coupon Updated Successfully!' : 'Coupon Posted Successfully!', 'Close',{
          duration : 5000
        });
        this.router.navigateByUrl('/admin/coupons');
      } else {
        this.showError(res.message);
      }
    }, error=>this.showError(apiErrorMessage(error, 'Could not save this coupon')))
  }

  private showError(message: string){
    this.snackBar.open(message, 'Close', {
      duration : 5000,
      panelClass:'error-snackbar'
    });
  }

}
