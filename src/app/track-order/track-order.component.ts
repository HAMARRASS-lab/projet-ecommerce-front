import { AuthService } from './../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  ) { }

  ngOnInit(): void {
    this.searchOrderForm=this.fb.group({
      trackingId: [null, [Validators.required]]
    })
  }
  submitForm(){
    this.authService.getOrderByTrackingId(this.searchOrderForm.get('trackingId').value).subscribe(res =>{
      console.log(res);
      this.order=res;
    })
  }

}
