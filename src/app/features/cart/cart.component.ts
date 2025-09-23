import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-cart',
  standalone: false,
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
items: any[] = [];
subtotal: number = 0;

constructor(private router: Router, private cartService: CartService, private ref:MatDialogRef<CartComponent>){}

closepopup(){
  this.ref.close()
}
ngOnInit() {
    this.loadCart();
  }
loadCart() {
    this.items = this.cartService.getItems();
    this.subtotal = this.cartService.getTotalPrice();
  }
increase(item: any) {
    item.quantity++;
    item.total = item.quantity * item.price;
    this.loadCart();
  }
decrease(item: any) {
    if (item.quantity > 1) {
      item.quantity--;
      item.total = item.quantity * item.price;
      this.loadCart();
    }
  }
remove(item: any) {
  this.cartService.removeItem(item);
  this.loadCart();
}
goToCheckout(): void {
  this.router.navigate(['/checkout']);
  this.ref.close();
}
}
