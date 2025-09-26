import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import { ProductPageComponent } from './features/product-page/product-page.component';
import { CartComponent } from './features/cart/cart.component';
import { ProductDetailsComponent } from './features/product-details/product-details.component';
import { PopupComponent } from './features/popup/popup.component';
import { CheckoutComponent } from './features/checkout/checkout.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { CongratsPopupComponent } from './features/congrats-popup/congrats-popup.component';



const routes: Routes = [
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "product",
    component: ProductPageComponent
  },
  {
    path: "cart",
    component: CartComponent
  },
  {
    path: "product/:id",
    component: ProductDetailsComponent
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: "cart-pupup",
    component: PopupComponent
  },
  {
    path: "checkout",
    component: CheckoutComponent
  },
  {
    path: "navbar",
    component: NavbarComponent
  },
  {
    path: "congrats",
    component: CongratsPopupComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
