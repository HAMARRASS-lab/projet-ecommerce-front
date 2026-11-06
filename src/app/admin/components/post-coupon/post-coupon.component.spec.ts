import { HttpTestingController } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { TEST_IMPORTS } from 'src/app/testing/test-imports';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostCouponComponent } from './post-coupon.component';

describe('PostCouponComponent', () => {
  let component: PostCouponComponent;
  let fixture: ComponentFixture<PostCouponComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: TEST_IMPORTS,
      declarations: [ PostCouponComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostCouponComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('when editing, loads the coupon and saves it with PUT', () => {
    const http = TestBed.inject(HttpTestingController);
    spyOn(TestBed.inject(Router), 'navigateByUrl');
    component.couponId = 5;
    component.ngOnInit();
    http.expectOne(req => req.method === 'GET' && req.url.endsWith('api/admin/coupons/5')).flush({
      id: 5, name: 'Sale', code: 'SALE', discount: 10, expirationDate: '2030-01-01T00:00:00.000Z'
    });
    expect(component.couponForm.get('code').value).toBe('SALE');
    expect(component.couponForm.get('expirationDate').value instanceof Date).toBe(true);

    component.saveCoupon();
    const save = http.expectOne(req => req.url.endsWith('api/admin/coupons/5'));
    expect(save.request.method).toBe('PUT');
    save.flush({ id: 5 });
    expect(TestBed.inject(Router).navigateByUrl).toHaveBeenCalledWith('/admin/coupons');
  });

  it('rejects a discount above 100', () => {
    const discount = component.couponForm.get('discount');
    discount.setValue(150);
    expect(discount.valid).toBe(false);
    discount.setValue(100);
    expect(discount.valid).toBe(true);
  });
});
