import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { UserStorageService } from '../services/storage/user-storage.service';

/** Adds the JWT to API calls and ends the session when the API rejects it. */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router, private snackBar: MatSnackBar) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = UserStorageService.getToken();
    if (!token || !request.url.startsWith(environment.apiUrl)) {
      return next.handle(request);
    }

    const authorized = request.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
    return next.handle(authorized).pipe(
      catchError((error: HttpErrorResponse) => {
        // Spring Security answers 403 as well as 401 for an expired token.
        if (error.status === 401 || error.status === 403) {
          UserStorageService.signOut();
          this.snackBar.open('Your session has expired. Please log in again.', 'Close', { duration: 5000 });
          this.router.navigateByUrl('/login');
        }
        return throwError(error);
      })
    );
  }
}
