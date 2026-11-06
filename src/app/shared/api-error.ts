import { HttpErrorResponse } from '@angular/common/http';

/** The backend's own message when it sent one, otherwise the fallback. */
export function apiErrorMessage(error: HttpErrorResponse, fallback: string): string {
  const body = error.error;
  if (typeof body === 'string') {
    return body || fallback;
  }
  return body?.message || fallback;
}
