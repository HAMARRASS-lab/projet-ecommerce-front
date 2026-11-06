import { TEST_IMPORTS } from 'src/app/testing/test-imports';
import { HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewOrderProductComponent } from './view-order-product.component';

describe('ViewOrderProductComponent', () => {
  let component: ViewOrderProductComponent;
  let fixture: ComponentFixture<ViewOrderProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: TEST_IMPORTS,
      declarations: [ ViewOrderProductComponent ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewOrderProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shows the order total once, however many products there are', () => {
    TestBed.inject(HttpTestingController).expectOne(req => req.url.includes('ordered-products')).flush({
      productDtoList: [{ id: 1, name: 'A' }, { id: 2, name: 'B' }], orderAmount: 30
    });
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelectorAll('.total-price').length).toBe(1);
  });
});
