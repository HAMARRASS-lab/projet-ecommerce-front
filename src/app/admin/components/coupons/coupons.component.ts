import { AdminService } from './../../service/admin.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { apiErrorMessage } from 'src/app/shared/api-error';
import { confirmDelete } from 'src/app/shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-coupons',
  templateUrl: './coupons.component.html',
  styleUrls: ['./coupons.component.scss']
})
export class CouponsComponent implements OnInit {

  coupons: any;
  readonly columns = ['id','name','discount','code','expirationDate','actions'];

  constructor(
    private AdminService:AdminService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(){
    this.getCoupons();
  }

  getCoupons(){
    this.AdminService.getCoupons().subscribe(res=>{
      this.coupons=res;
    })
  }

  deleteCoupon(coupon: any){
    confirmDelete(this.dialog, `Delete coupon ${coupon.code}?`).subscribe(()=>{
      this.AdminService.deleteCoupon(coupon.id).subscribe(()=>{
        this.snackBar.open('Coupon deleted successfully', 'Close', {duration:5000});
        this.getCoupons();
      }, error=>{
        this.snackBar.open(apiErrorMessage(error, 'Could not delete this coupon'), 'Close', {
          duration:5000,
          panelClass:'error-snackbar'
        });
      })
    })
  }

}
