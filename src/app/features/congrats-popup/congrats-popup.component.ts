import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig  } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-congrats-popup',
  standalone: false,
  templateUrl: './congrats-popup.component.html',
  styleUrl: './congrats-popup.component.css'
})
export class CongratsPopupComponent {

constructor(private cartService: CartService, private route: ActivatedRoute, private dialog:MatDialog, private router: Router, private ref:MatDialogRef<CongratsPopupComponent>){}

closeCongratsPopp(){
  this.ref.close()
  this.router.navigate(['/product']);

}

redirectCongratsToProducts(){
  this.ref.close();
  this.router.navigate(['/product']);
  this.cartService.clearCart();
} 
}
