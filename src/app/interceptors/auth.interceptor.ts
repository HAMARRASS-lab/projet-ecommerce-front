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
        // Spring Security answers 403 for an expired token as well as for a
        // real permission error, so the token's own expiry tells them apart.
        if (error.status === 401 || (error.status === 403 && UserStorageService.isTokenExpired(token))) {
          this.endSession();
        } else if (error.status === 403) {
          this.snackBar.open('You do not have permission to do that.', 'Close', { duration: 5000 });
        }
        return throwError(error);
      })
    );
  }

  private endSession(): void {
    UserStorageService.signOut();
    // Shown after navigating so a component's own error message can't replace it.
    this.router.navigateByUrl('/login').then(() =>
      this.snackBar.open('Your session has expired. Please log in again.', 'Close', { duration: 5000 })
    );
  }
}
