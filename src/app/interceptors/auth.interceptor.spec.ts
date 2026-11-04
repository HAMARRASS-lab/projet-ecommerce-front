import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { environment } from 'src/environments/environment';
import { UserStorageService } from '../services/storage/user-storage.service';
import { AuthInterceptor } from './auth.interceptor';

describe('AuthInterceptor', () => {
  let http: HttpClient;
  let mock: HttpTestingController;
  let router: Router;
  const url = environment.apiUrl + 'api/customer/products';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, MatSnackBarModule, NoopAnimationsModule],
      providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
    });
    http = TestBed.inject(HttpClient);
    mock = TestBed.inject(HttpTestingController);
    router = TestBed.inject(Router);
    spyOn(router, 'navigateByUrl').and.resolveTo(true);
    TestBed.inject(UserStorageService).saveToken('abc');
  });

  afterEach(() => {
    mock.verify();
    UserStorageService.signOut();
  });

  it('adds a correctly formatted bearer token to API calls', () => {
    http.get(url).subscribe();
    const request = mock.expectOne(url);
    expect(request.request.headers.get('Authorization')).toBe('Bearer abc');
    request.flush([]);
  });

  it('never sends the token to other hosts', () => {
    http.get('https://example.com/data').subscribe();
    const request = mock.expectOne('https://example.com/data');
    expect(request.request.headers.has('Authorization')).toBe(false);
    request.flush({});
  });

  it('sends no header when signed out', () => {
    UserStorageService.signOut();
    http.get(url).subscribe();
    const request = mock.expectOne(url);
    expect(request.request.headers.has('Authorization')).toBe(false);
    request.flush([]);
  });

  [401, 403].forEach(status => {
    it(`ends the session on ${status}`, () => {
      let received: number | undefined;
      http.get(url).subscribe({ error: error => received = error.status });
      mock.expectOne(url).flush('', { status, statusText: 'Denied' });

      expect(received).toBe(status);
      expect(UserStorageService.getToken()).toBeNull();
      expect(router.navigateByUrl).toHaveBeenCalledWith('/login');
    });
  });

  it('keeps the session on other errors', () => {
    http.get(url).subscribe({ error: () => undefined });
    mock.expectOne(url).flush('', { status: 500, statusText: 'Server Error' });

    expect(UserStorageService.getToken()).toBe('abc');
    expect(router.navigateByUrl).not.toHaveBeenCalled();
  });
});
