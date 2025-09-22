import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import { ProductPageComponent } from './features/product-page/product-page.component';
import { CartComponent } from './features/cart/cart.component';
import { ProductDetailsComponent } from './features/product-details/product-details.component';

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
  { path: '', redirectTo: '/product', pathMatch: 'full' }
   
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
