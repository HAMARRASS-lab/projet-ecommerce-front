import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerComponent } from './customer.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CartComponent } from './components/cart/cart.component';
import { MyOrderComponent } from './components/my-order/my-order.component';
import { ViewOrderProductComponent } from './components/view-order-product/view-order-product.component';
import { ReviewOrderedProductComponent } from './components/review-ordered-product/review-ordered-product.component';


const routes: Routes = [
  { path: '', component: CustomerComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'cart', component: CartComponent },
  { path: 'my_orders', component: MyOrderComponent },
  { path: 'ordered_products/:orderId', component: ViewOrderProductComponent },
  { path: 'review/:orderId', component: ReviewOrderedProductComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
