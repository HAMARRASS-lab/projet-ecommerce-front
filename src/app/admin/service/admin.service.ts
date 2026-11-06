import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const BASIC_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  addCategory(categoryDto: any): Observable<any> {
    return this.http.post(BASIC_URL + 'api/admin/category', categoryDto)

  }
  getAllCategories(): Observable<any> {
    return this.http.get(BASIC_URL + 'api/admin')

  }
  getCategoryById(categoryId: number): Observable<any> {
    return this.http.get(BASIC_URL + `api/admin/category/${categoryId}`)

  }
  updateCategory(categoryId: number, categoryDto: any): Observable<any> {
    return this.http.put(BASIC_URL + `api/admin/category/${categoryId}`, categoryDto)

  }
  deleteCategory(categoryId: number): Observable<any> {
    return this.http.delete(BASIC_URL + `api/admin/category/${categoryId}`)

  }
  addProduct(productDto: any): Observable<any> {
    return this.http.post(BASIC_URL + 'api/admin/product', productDto)

  }
  updateProduct(productId: any, productDto: any): Observable<any> {
    return this.http.put(BASIC_URL + `api/admin/product/${productId}`, productDto)

  }
  getAllProducts(): Observable<any> {
    return this.http.get(BASIC_URL + 'api/admin/products')

  }
  getAllProductByName(name: any): Observable<any> {
    return this.http.get(BASIC_URL + `api/admin/search/${name}`)

  }
  deleteProduct(productId: any): Observable<any> {
    return this.http.delete(BASIC_URL + `api/admin/product/${productId}`)

  }
  addCoupon(couponDto: any): Observable<any> {
    return this.http.post(BASIC_URL + 'api/admin/coupons', couponDto)

  }
  getCoupons(): Observable<any> {
    return this.http.get(BASIC_URL + 'api/admin/coupons')

  }
  getCouponById(couponId: number): Observable<any> {
    return this.http.get(BASIC_URL + `api/admin/coupons/${couponId}`)

  }
  updateCoupon(couponId: number, couponDto: any): Observable<any> {
    return this.http.put(BASIC_URL + `api/admin/coupons/${couponId}`, couponDto)

  }
  deleteCoupon(couponId: number): Observable<any> {
    return this.http.delete(BASIC_URL + `api/admin/coupons/${couponId}`)

  }
  getPlaceOrders(): Observable<any> {
    return this.http.get(BASIC_URL + 'api/admin/placeOrders')

  }

  getAnalytics() : Observable<any>{
    return this.http.get(BASIC_URL+ 'api/admin/order/analytics')

  }

  chengeOrderStatus(orderId: number, status: string): Observable<any> {
    return this.http.get(BASIC_URL + `api/admin/order/${orderId}/${status}`)

  }

  postFAQ(productId: number, faqDto: any): Observable<any> {
    return this.http.post(BASIC_URL + `api/admin/faq/${productId}`, faqDto)

  }

  getFAQs(productId: number): Observable<any> {
    return this.http.get(BASIC_URL + `api/admin/faq/${productId}`)

  }

  updateFAQ(faqId: number, faqDto: any): Observable<any> {
    return this.http.put(BASIC_URL + `api/admin/faq/${faqId}`, faqDto)

  }

  deleteFAQ(faqId: number): Observable<any> {
    return this.http.delete(BASIC_URL + `api/admin/faq/${faqId}`)

  }

  getProductsById(productId): Observable<any> {
    return this.http.get(BASIC_URL + `api/admin/products/${productId}`)

  }


}
