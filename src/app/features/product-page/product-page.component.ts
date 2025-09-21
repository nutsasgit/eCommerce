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
  filteredItems: any[] = [];
  totalProducts: number = 0;

  from: number | null = null;
  to: number | null = null;
  sort: string = 'newest';
  Filter: boolean = false;
  dropdownFilter: boolean = false; 
  

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadProducts();
  }

 
  loadProducts() {
    let params: any = {};

    if (this.from !== null) params['filter[price_from]'] = this.from;
    if (this.to !== null) params['filter[price_to]'] = this.to;

    
    if (this.sort === 'low') params['sort'] = 'price';
    else if (this.sort === 'heigh') params['sort'] = '-price';
    else params['sort'] = 'created_at';

    this.http
      .get<any>('https://api.redseam.redberryinternship.ge/api/products', { params })
      .subscribe(res => {
        this.allItems = res.data;
        this.filteredItems = [...this.allItems];
        this.totalProducts = res.meta?.total || this.allItems.length;
      });
  }

  
  toggleFilter() {
    this.Filter = !this.Filter;
  }

  
  filterFunction() {
    this.loadProducts();
    this.Filter = false;
  }

  
  toggleDropdown() {
    this.dropdownFilter = !this.dropdownFilter;
  }

  setSort(option: string) {
    this.sort = option;
    this.filterFunction();
    this.dropdownFilter = false;
  }
}

