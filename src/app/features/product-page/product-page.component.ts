import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';



@Component({
  selector: 'app-product-page',
  standalone: false,
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.css'
})

export class ProductPageComponent implements OnInit {
  allItems: any[] = [];          
  totalProducts: number = 0;     

  from: number | null = null;    
  to: number | null = null;      
  sort: string = 'newest';       

  filterVisible: boolean = false;
  dropdownFilter: boolean = false;

  actualPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 0;
  showingFrom: number = 0;
  showingTo: number = 0;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    const params: any = {
      page: this.actualPage,
      per_page: this.itemsPerPage
    };

    if (this.from !== null) params['filter[price_from]'] = this.from;
    if (this.to !== null) params['filter[price_to]'] = this.to;

    switch (this.sort) {
      case 'low':
        params['sort'] = 'price';
        break;
      case 'height':
        params['sort'] = '-price';
        break;
      default:
        params['sort'] = 'created_at';
    }

    this.http.get<any>('https://api.redseam.redberryinternship.ge/api/products', { params })
      .subscribe(res => {
        this.allItems = res.data;
        const meta = res.meta;

        
        this.totalProducts = meta.total;
        this.actualPage = meta.current_page;
        this.totalPages = meta.last_page;
        this.showingFrom = meta.from;
        this.showingTo = meta.to;
      });
  }

  toggleFilter(): void {
    this.filterVisible = !this.filterVisible;
  }

  applyFilter(): void {
    this.actualPage = 1;
    this.loadProducts();
    this.filterVisible = false;
  }

  toggleDropdown(): void {
    this.dropdownFilter = !this.dropdownFilter;
  }

  setSort(option: string): void {
    this.sort = option;
    this.applyFilter();
    this.dropdownFilter = false;
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.actualPage = page;
      this.loadProducts();
    }
  }

 
  get visiblePages(): (number | string)[] {
    const total = this.totalPages;
    const current = this.actualPage;
    const delta = 2;
    const range: (number | string)[] = [];

    if (total <= 7) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }

 
    range.push(1);

    if (current - delta > 2) range.push('...');

    for (let i = Math.max(2, current - delta); i <= Math.min(total - 1, current + delta); i++) {
      range.push(i);
    }

    if (current + delta < total - 1) range.push('...');

    range.push(total);

    return range;
  }

  isNumber(value: number | string): value is number {
    return typeof value === 'number';
  }

  goToDetails(id: number): void {
    this.router.navigate(['/product', id]);
  }
}


