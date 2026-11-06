# Cart, wishlist and admin management: backend contract

The screens for these actions are ready, but they need the endpoints below. Until
an endpoint exists, the screen shows an error message and changes nothing.

All of them require the JWT. Errors may be plain text or JSON with a `message`
field, and the text is shown to the user, so keep it readable.

## Customer

| Method | Path | Purpose |
|---|---|---|
| `DELETE` | `api/customer/cart/{userId}/{productId}` | Remove a product from the active cart |
| `DELETE` | `api/customer/wishlist/{wishlistId}` | Remove a wishlist entry |

- Take the user from the JWT and reject a `userId`, or a wishlist entry, that belongs to someone else.
- Removing from the cart must recalculate the cart's amounts, including any coupon.
- `GET api/customer/wishlist/{userId}` must include each entry's `id`.

## Admin

All of these need the `ADMIN` role.

| Method | Path | Body | Response |
|---|---|---|---|
| `GET` | `api/admin/coupons/{id}` | | Coupon |
| `PUT` | `api/admin/coupons/{id}` | `name`, `code`, `discount`, `expirationDate` | Coupon with `id` |
| `DELETE` | `api/admin/coupons/{id}` | | Empty |
| `GET` | `api/admin/category/{id}` | | Category |
| `PUT` | `api/admin/category/{id}` | `name`, `description` | Category with `id` |
| `DELETE` | `api/admin/category/{id}` | | Empty |
| `GET` | `api/admin/faq/{productId}` | | List of FAQs with `id`, `question`, `answer` |
| `PUT` | `api/admin/faq/{faqId}` | `question`, `answer` | FAQ with `id` |
| `DELETE` | `api/admin/faq/{faqId}` | | Empty |

- `api/admin/faq/{...}` takes a product ID on `GET` and `POST`, and an FAQ ID on `PUT` and `DELETE`.
- Refuse to delete a category that still has products, with a `409` and a message saying so.
- Decide what happens to a coupon already applied to a cart before allowing it to be deleted,
  and keep past orders intact.

## Reviews

Posting a review now leaves out `img` when the customer doesn't choose a photo.
The endpoint must treat the image as optional.

## Status codes

Return `401` rather than `403` for a missing or expired token. The frontend works
around `403` by reading the token's expiry, and `401` makes that check unnecessary.
