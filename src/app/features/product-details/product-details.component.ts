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

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    console.log('Product ID from route:', id);

    if (!id) return;

    // Fetch all products
    this.http.get<any>('https://api.redseam.redberryinternship.ge/api/products')
      .subscribe({
        next: res => {
          console.log('API response:', res);

          if (res.data && res.data.length > 0) {
            // Find the product with the matching ID
            this.product = res.data.find((p: any) => p.id === +id);

            if (this.product) {
              this.images = this.product.images;     // array of URLs
              this.selectedImage = this.images[0];   // first image as main
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
}

