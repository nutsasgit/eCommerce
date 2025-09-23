import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CongratsPopupComponent } from '../congrats-popup/congrats-popup.component';

@Component({
  selector: 'app-checkout',
  standalone: false,
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {
  firstName: string = "";
  lastName: string = "";
  eMail: string = ""
  address: string = "";
  zipCode: string = ""

  items: any[] = [];
 subtotal: number = 0;
 
constructor(private router: Router, private cartService: CartService, private dialog:MatDialog ){}

  pay(){
    this.firstName === "" ||
      this.lastName === "" ||
      this.eMail === "" ||
      this.address === "" ||
      this.zipCode === ""
      {console.log("payment succesfull");
      return;
    }
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
 openCongratsPopup(){
    this.dialog.open(CongratsPopupComponent,{
      
      panelClass: "congratsPopupStyle",

    })
  }
}
