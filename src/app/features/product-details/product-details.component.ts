import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

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

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

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
              // Images
              this.images = this.product.images;
              this.selectedImage = this.images[0];

              // Default color
              if (this.product.available_colors.length > 0) {
                this.selectedColor = this.product.available_colors[0];
              }

              // Default size
              if (this.product.available_sizes.length > 0) {
                this.selectedSize = this.product.available_sizes[0];
              }

              // Quantity is already default 1
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

  // Change main image
  changeImage(img: string): void {
    this.selectedImage = img;
  }

  // Select a color
  selectColor(color: string): void {
    this.selectedColor = color;
  }

  // Select a size
  selectSize(size: string): void {
    this.selectedSize = size;
  }

  // Add to cart (optional)
  addToCart(): void {
    if (!this.product) return;

    const cartItem = {
      id: this.product.id,
      name: this.product.name,
      color: this.selectedColor,
      size: this.selectedSize,
      quantity: this.quantity,
      price: this.product.price,
      total: this.product.price * this.quantity
    };

    console.log('Add to cart:', cartItem);
    // Here you could push to a cart array or call a cart service
  }
}


