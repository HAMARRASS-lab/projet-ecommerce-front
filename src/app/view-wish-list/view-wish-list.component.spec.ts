import { HttpTestingController } from '@angular/common/http/testing';
import { environment } from 'src/environments/environment';
import { TEST_IMPORTS } from 'src/app/testing/test-imports';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewWishListComponent } from './view-wish-list.component';

describe('ViewWishListComponent', () => {
  let component: ViewWishListComponent;
  let fixture: ComponentFixture<ViewWishListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: TEST_IMPORTS,
      declarations: [ ViewWishListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewWishListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('removes a product, then shows the empty state', () => {
    const http = TestBed.inject(HttpTestingController);
    const list = () => http.expectOne(req => req.method === 'GET' && req.url.includes('api/customer/wishlist/'));
    list().flush([{ id: 3, productName: 'Shoe' }]);
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Shoe');

    component.remove(3);
    const removal = http.expectOne(`${environment.apiUrl}api/customer/wishlist/3`);
    expect(removal.request.method).toBe('DELETE');
    removal.flush(null);
    list().flush([]);
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Your wishlist is empty.');
  });
});
