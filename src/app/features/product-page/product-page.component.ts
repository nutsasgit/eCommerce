import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-product-page',
  standalone: false,
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.css'
})

export class ProductPageComponent implements OnInit {
  allItems: any[] = [];          // Products returned from API
  totalProducts: number = 0;     // Total number of products from API meta

  from: number | null = null;    // Filter price from
  to: number | null = null;      // Filter price to
  sort: string = 'newest';       // Sorting option

  filterVisible: boolean = false;
  dropdownFilter: boolean = false;

  actualPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 0;
  showingFrom: number = 0;
  showingTo: number = 0;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  /**
   * Load products from API with filters, sorting, and pagination
   */
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

        // Use meta for accurate pagination info
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

  /**
   * Windowed pagination: first, last, current ±2 pages, ellipses
   */
  get visiblePages(): (number | string)[] {
    const total = this.totalPages;
    const current = this.actualPage;
    const delta = 2; // pages before and after current
    const range: (number | string)[] = [];

    if (total <= 7) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }

    // first page
    range.push(1);

    // left ellipsis
    if (current - delta > 2) range.push('...');

    // middle pages
    for (let i = Math.max(2, current - delta); i <= Math.min(total - 1, current + delta); i++) {
      range.push(i);
    }

    // right ellipsis
    if (current + delta < total - 1) range.push('...');

    // last page
    range.push(total);

    return range;
  }

  /**
   * Helper to check if value is a number
   */
  isNumber(value: number | string): value is number {
    return typeof value === 'number';
  }
}


