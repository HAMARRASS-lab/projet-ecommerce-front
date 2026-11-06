import { Router } from '@angular/router';
import { TEST_IMPORTS } from 'src/app/testing/test-imports';
import { HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewOrderedProductComponent } from './review-ordered-product.component';

describe('ReviewOrderedProductComponent', () => {
  let component: ReviewOrderedProductComponent;
  let fixture: ComponentFixture<ReviewOrderedProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: TEST_IMPORTS,
      declarations: [ ReviewOrderedProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewOrderedProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('does not submit an incomplete review', () => {
    component.submitForm();
    TestBed.inject(HttpTestingController).verify();
  });

  it('leaves out the image when none was chosen', () => {
    spyOn(TestBed.inject(Router), 'navigateByUrl');
    component.productId = 2;
    component.reviewForm.setValue({ rating: '5', description: 'Great' });
    component.submitForm();
    const request = TestBed.inject(HttpTestingController).expectOne(req => req.url.endsWith('api/customer/review'));
    expect((request.request.body as FormData).has('img')).toBe(false);
    request.flush({ id: 1 });
  });

  it('keeps the current image when the file picker is cancelled', () => {
    expect(() => component.onFileSelected({ target: { files: [] } })).not.toThrow();
  });
});
