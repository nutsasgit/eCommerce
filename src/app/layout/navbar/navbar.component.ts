import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
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
navbarType: number = 1;
isLoggedIn: boolean = false;
userAvatar: string = 'nav/Union.png';


constructor(private router: Router, private dialog:MatDialog, private cartService: CartService) {}

ngOnInit(): void {
    this.updateLoginState();
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.navbarType = event.url.includes('/products') ? 2 : 1;
        this.updateLoginState();
      });

    
    }
updateLoginState(): void {
  const token = localStorage.getItem('token');
  const avatar = localStorage.getItem('avatar');
  if (token) {
    this.isLoggedIn = true;
    this.userAvatar = avatar ? avatar : 'nav/Union.png';
  } else {
    this.isLoggedIn = false;
    this.userAvatar = 'nav/Union.png';
  }
}


redirect(){
  if(this.isLoggedIn){
    this.router.navigate(['/product']);
  }else{
    this.router.navigate(['/login']);
  }
}

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
        width: '450px',
        height: '680px',
        panelClass: 'popupStyle',
        data: { items }
      });
    }
  }
}
