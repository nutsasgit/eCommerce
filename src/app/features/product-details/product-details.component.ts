import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PopupComponent } from '../popup/popup.component';
import { CartComponent } from '../cart/cart.component';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-details',
  standalone: false,
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {
  product: any;
  images: string[] = [];
  selectedImage: string = '';

  selectedColor: string = '';
  selectedSize: string = '';
  quantity: number = 1;
  quantities: number[] = Array.from({ length: 10 }, (_, i) => i + 1);
  

  constructor(private route: ActivatedRoute, private http: HttpClient, private dialog:MatDialog, private cartService: CartService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    console.log('Product ID from route:', id);

    if (!id) return;

    this.http.get<any>('https://api.redseam.redberryinternship.ge/api/products')
      .subscribe({
        next: res => {
          console.log('API response:', res);

          if (res.data && res.data.length > 0) {
            this.product = res.data.find((p: any) => p.id === +id);

            if (this.product) {
           
              this.images = this.product.images;
              this.selectedImage = this.images[0];

             
              if (this.product.available_colors.length > 0) {
                this.selectedColor = this.product.available_colors[0];
              }

              
              if (this.product.available_sizes.length > 0) {
                this.selectedSize = this.product.available_sizes[0];
              }

             
            } else {
              console.error('No product found with this ID');
            }
          } else {
            console.error('No products returned from API');
          }
        },
        error: err => console.error('API error:', err)
      });
  }

  
  changeImage(img: string): void {
    this.selectedImage = img;
  }

  
  selectColor(color: string): void {
    this.selectedColor = color;
  }

 
  selectSize(size: string): void {
    this.selectedSize = size;
  }

 
  addToCart(): void {
    if (!this.product) return;

    const cartItem = {
      id: this.product.id,
      name: this.product.name,
      color: this.selectedColor,
      size: this.selectedSize,
      quantity: this.quantity,
      price: this.product.price,
      total: this.product.price * this.quantity,
      image: this.selectedImage
    };
    this.cartService.addToCart(cartItem);
    
 
  }
  clearCart() {
  this.cartService.clearCart();
  
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
        width: '400px',
        height: '680px',
        panelClass: 'popupStyle',
        data: { items }
      });
    }
  }
}


