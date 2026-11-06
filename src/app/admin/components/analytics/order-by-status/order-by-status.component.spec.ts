import { TEST_IMPORTS } from 'src/app/testing/test-imports';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderByStatusComponent } from './order-by-status.component';

describe('OrderByStatusComponent', () => {
  let component: OrderByStatusComponent;
  let fixture: ComponentFixture<OrderByStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: TEST_IMPORTS,
      declarations: [ OrderByStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderByStatusComponent);
    component = fixture.componentInstance;
    component.data = { placed: 1, shipped: 2, delivered: 3 };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
