# Stripe Checkout: backend contract

The "Pay by card" option needs these two endpoints. Until they exist, customers
see "Card payment is not available right now", and cash on delivery still works.

Keep the Stripe secret key on the backend. The frontend never sees it.

## `POST api/customer/checkout-session`

Request:

```json
{ "address": "12 Main St", "orderDescription": "Leave at door", "userId": 1 }
```

Create a Stripe Checkout Session in `payment` mode and return its URL:

```json
{ "url": "https://checkout.stripe.com/c/pay/..." }
```

- Take the amount from the user's cart on the server, including any coupon.
  Never trust an amount sent by the browser.
- Take the user from the JWT and reject a `userId` that does not match it.
- Set these URLs in backend configuration, not from the request:
  - `success_url`: `{FRONTEND_URL}/customer/payment-result?session_id={CHECKOUT_SESSION_ID}`
  - `cancel_url`: `{FRONTEND_URL}/customer/payment-result?cancelled=true`

## `GET api/customer/checkout-session/{sessionId}`

```json
{ "paymentStatus": "paid", "trackingId": "9f1c..." }
```

- `paymentStatus` is Stripe's `payment_status`. The page treats `paid` as success
  and anything else as still processing.
- `trackingId` is `null` until the order exists.
- Reject sessions that belong to another user.

## Webhook

Create the order and empty the cart when Stripe sends `checkout.session.completed`,
not when the customer lands on the result page, because they may close the tab first.

- Verify the Stripe signature.
- Handle repeat deliveries so one payment cannot create two orders.
- Keep the webhook path public and exclude it from JWT authentication.
