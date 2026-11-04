import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from '../../services/customer.service';

type PaymentState = 'loading' | 'paid' | 'pending' | 'cancelled' | 'error';

/** Stripe Checkout sends the customer back here after paying or cancelling. */
@Component({
  selector: 'app-payment-result',
  templateUrl: './payment-result.component.html',
  styleUrls: ['./payment-result.component.scss']
})
export class PaymentResultComponent implements OnInit {

  state: PaymentState = 'loading';
  trackingId: string | null = null;

  constructor(private route: ActivatedRoute, private customerService: CustomerService) { }

  ngOnInit(): void {
    const params = this.route.snapshot.queryParamMap;
    const sessionId = params.get('session_id');

    if (params.has('cancelled')) {
      this.state = 'cancelled';
    } else if (!sessionId) {
      this.state = 'error';
    } else {
      this.customerService.getCheckoutSession(sessionId).subscribe(res => {
        this.state = res.paymentStatus === 'paid' ? 'paid' : 'pending';
        this.trackingId = res.trackingId;
      }, () => this.state = 'error');
    }
  }
}
