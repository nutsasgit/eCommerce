import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CartService } from '../../services/cart.service';
import { PopupComponent } from '../../features/popup/popup.component';
import { CartComponent } from '../../features/cart/cart.component';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {


constructor( private dialog:MatDialog, private cartService: CartService) {}
Openpopup(): void {
    const items = this.cartService.getItems(); 
    if (!items || items.length === 0) {
      this.dialog.open(PopupComponent, {
        width: '400px',
        height: '680px',
        panelClass: 'popupStyle'
      });
    } else {
      this.dialog.open(CartComponent, {
        width: '400px',
        height: '680px',
        panelClass: 'popupStyle',
        data: { items }
      });
    }
  }
}
