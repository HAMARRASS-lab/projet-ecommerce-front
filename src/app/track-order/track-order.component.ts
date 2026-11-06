import { AuthService } from './../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-track-order',
  templateUrl: './track-order.component.html',
  styleUrls: ['./track-order.component.scss']
})
export class TrackOrderComponent implements OnInit {

  searchOrderForm!: FormGroup;
  order :any;

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar,

  ) { }

  ngOnInit(): void {
    this.searchOrderForm=this.fb.group({
      trackingId: [null, [Validators.required]]
    })
  }
  submitForm(){
    const trackingId = this.searchOrderForm.get('trackingId').value?.trim();
    if(!trackingId){
      return;
    }
    this.order = null;
    this.authService.getOrderByTrackingId(trackingId).subscribe(res =>{
      this.order=res;
      if(!res){
        this.showNotFound();
      }
    }, () => this.showNotFound())
  }

  private showNotFound(){
    this.snackBar.open('No order found for this tracking ID', 'Close', {duration: 5000});
  }

}
