import { HttpErrorResponse } from '@angular/common/http';
import { apiErrorMessage } from './api-error';

describe('apiErrorMessage', () => {
  const withBody = (error: unknown) => new HttpErrorResponse({ error, status: 400 });

  it('uses a plain text body', () => {
    expect(apiErrorMessage(withBody('Coupon expired'), 'Failed')).toBe('Coupon expired');
  });

  it('uses the message of a JSON body', () => {
    expect(apiErrorMessage(withBody({ message: 'Coupon expired' }), 'Failed')).toBe('Coupon expired');
  });

  it('falls back when the body has nothing to show', () => {
    expect(apiErrorMessage(withBody(''), 'Failed')).toBe('Failed');
    expect(apiErrorMessage(withBody(null), 'Failed')).toBe('Failed');
    expect(apiErrorMessage(withBody({ status: 400 }), 'Failed')).toBe('Failed');
  });
});
