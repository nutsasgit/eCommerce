import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-product-page',
  standalone: false,
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.css'
})
export class ProductPageComponent implements OnInit {
    allItems: any[] = [];

    constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http
      .get<any>('https://api.redseam.redberryinternship.ge/api/products')
      .subscribe(res => {
        this.allItems = res.data;
      })
  }
}
