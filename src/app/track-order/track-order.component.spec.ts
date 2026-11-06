import { HttpTestingController } from '@angular/common/http/testing';
import { TEST_IMPORTS } from 'src/app/testing/test-imports';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackOrderComponent } from './track-order.component';

describe('TrackOrderComponent', () => {
  let component: TrackOrderComponent;
  let fixture: ComponentFixture<TrackOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: TEST_IMPORTS,
      declarations: [ TrackOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('clears the previous order when a search finds nothing', () => {
    component.order = { trackingId: 'old' };
    component.searchOrderForm.setValue({ trackingId: ' new ' });
    component.submitForm();
    TestBed.inject(HttpTestingController).expectOne(req => req.url.endsWith('order/new'))
      .flush('', { status: 404, statusText: 'Not Found' });
    expect(component.order).toBeNull();
  });
});
