import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserStorageService } from 'src/app/services/storage/user-storage.service';

const BASIC_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<any> {
    return this.http.get(BASIC_URL + 'api/customer/products')

  }
  getAllProductByName(name: any): Observable<any> {
    return this.http.get(BASIC_URL + `api/customer/search/${name}`)

  }
  addToCart(productId: any): Observable<any> {
    const cartDto = {
      productId: productId,
      userId: UserStorageService.getUserId()
    }
    return this.http.post(BASIC_URL + `api/customer/cart`, cartDto)

  }
  increaseProductQuantity(productId: any): Observable<any> {
    const cartDto = {
      productId: productId,
      userId: UserStorageService.getUserId()
    }
    return this.http.post(BASIC_URL + `api/customer/addition`, cartDto)

  }

  decreaseProductQuantity(productId: any): Observable<any> {
    const cartDto = {
      productId: productId,
      userId: UserStorageService.getUserId()
    }
    return this.http.post(BASIC_URL + `api/customer/deduction`, cartDto)

  }

  getCartByUserId(): Observable<any> {
    const userId = UserStorageService.getUserId()
    return this.http.get(BASIC_URL + `api/customer/cart/${userId}`)

  }

  applyCoupon(code: any): Observable<any> {
    const userId = UserStorageService.getUserId()
    return this.http.get(BASIC_URL + `api/customer/coupon/${userId}/${code}`)

  }
  
  placeOreder(orderDto: any): Observable<any> {
    orderDto.userId = UserStorageService.getUserId()
    return this.http.post(BASIC_URL + `api/customer/placeOrder`, orderDto)

  }
  /** Asks the backend for a Stripe Checkout page; the response carries its `url`. */
  createCheckoutSession(orderDto: any): Observable<any> {
    orderDto.userId = UserStorageService.getUserId()
    return this.http.post(BASIC_URL + `api/customer/checkout-session`, orderDto)
  }

  getCheckoutSession(sessionId: string): Observable<any> {
    return this.http.get(BASIC_URL + `api/customer/checkout-session/${encodeURIComponent(sessionId)}`)
  }

  getOrdersByUserId(): Observable<any> {
    const userId = UserStorageService.getUserId()
    return this.http.get(BASIC_URL + `api/customer/myOrders/${userId}`)

  }


  getOrderedProducts(orderId: number): Observable<any> {

    return this.http.get(BASIC_URL + `api/customer/ordered-products/${orderId}`)

  }

  giveReview(reviewDto: any): Observable<any> {

    return this.http.post(BASIC_URL + `api/customer/review`, reviewDto)

  }
  addProductToWishlist(wishListDto: any): Observable<any> {

    return this.http.post(BASIC_URL + `api/customer/wishlist`, wishListDto)

  }
  getWishlistByUserId(): Observable<any> {
    const userId = UserStorageService.getUserId();
    return this.http.get(BASIC_URL + `api/customer/wishlist/${userId}`)

  }
  
  getProductDetailById(productId: number): Observable<any> {

    return this.http.get(BASIC_URL + `api/customer/product/${productId}`)
  }



}
