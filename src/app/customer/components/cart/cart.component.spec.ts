import { TEST_IMPORTS } from 'src/app/testing/test-imports';
import { HttpTestingController } from '@angular/common/http/testing';
import { environment } from 'src/environments/environment';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartComponent } from './cart.component';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: TEST_IMPORTS,
      declarations: [ CartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('removes an item, then reloads the cart', () => {
    const http = TestBed.inject(HttpTestingController);
    const cart = () => http.expectOne(req => req.method === 'GET' && req.url.includes('api/customer/cart/'));
    cart().flush({ cartItems: [] });

    component.removeItem(7);
    const removal = http.expectOne(`${environment.apiUrl}api/customer/cart//7`);
    expect(removal.request.method).toBe('DELETE');
    removal.flush(null);
    cart().flush({ cartItems: [] });
    http.verify();
  });

  it('does not call the API with an empty coupon code', () => {
    const http = TestBed.inject(HttpTestingController);
    component.applyCoupon();
    http.expectNone(req => req.url.includes('coupon'));
  });
});
