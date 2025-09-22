import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import { ProductPageComponent } from './features/product-page/product-page.component';
import { CartComponent } from './features/cart/cart.component';
import { ProductDetailsComponent } from './features/product-details/product-details.component';
import { PopupComponent } from './features/popup/popup.component';


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
  { path: '', redirectTo: '/product', pathMatch: 'full' },
  {
    path: "cart",
    component: PopupComponent
  }

    
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
