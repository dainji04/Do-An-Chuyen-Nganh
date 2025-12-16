import {
  Component,
  inject,
  Input,
  numberAttribute,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Breadcrumb } from '../../components/breadcrumb/breadcrumb';
import { FormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSliderModule } from 'ng-zorro-antd/slider';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { CategoryService } from '../../services/category/category';
import { Products } from '../../services/products/products';
import { Category } from '../../types/category';
import { Product, ProductResponse } from '../../types/product';
import { ProductCardType } from '../../components/product-card-type/product-card-type';
import { CommonModule } from '@angular/common';
interface BreadcrumbItem {
  label: string;
  url?: string;
}

@Component({
  selector: 'app-search-page',
  imports: [
    CommonModule,
    Breadcrumb,
    FormsModule,
    NzInputModule,
    NzSliderModule,
    NzSelectModule,
    NzPaginationModule,
    NzIconModule,
    NzButtonModule,
    NzSpinModule,
    NzEmptyModule,
    ProductCardType,
  ],
  templateUrl: './search-page.html',
  styleUrl: './search-page.scss',
})
export class SearchPage implements OnChanges, OnInit {
  @Input() keyword: string = '';
  @Input({ transform: numberAttribute }) page: number = 1;
  @Input({ transform: numberAttribute }) limit: number = 12;

  // response
  productResponse!: ProductResponse;

  // Data
  categories: Category[] = [];
  products: Product[] = [];
  filteredProducts: Product[] = [];

  // Filter states
  selectedCategories: number[] = [];
  priceRange: [number, number] = [0, 10000000];
  maxPrice: number = 10000000;
  searchQuery: string = '';

  // Sort and view
  sortBy: string = 'default';

  // Pagination
  currentPage: number = 1;
  pageSize: number = 9;
  total: number = 0;

  // Loading
  isLoading: boolean = false;

  breadcrumbItems: BreadcrumbItem[] = [{ label: 'Home', url: '/' }, { label: 'Search' }];

  private categoryService = inject(CategoryService);
  private productService = inject(Products);

  ngOnInit(): void {
    this.loadCategories();
    this.loadProducts();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['keyword']) {
      this.searchQuery = this.keyword;
      // this.applyFilters();
    }
  }

  async loadCategories(): Promise<void> {
    this.categories = await this.categoryService.getCategories();
  }

  loadProducts(): void {
    this.isLoading = true;
    this.productService.searchProducts(this.keyword).subscribe({
      next: (data: ProductResponse) => {
        this.productResponse = data;
        this.products = data.data;
        // this.applyFilters();
        this.total = this.products.length;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading products:', error);
        this.isLoading = false;
      },
    });
  }

  // Category filter
  toggleCategory(categoryId: number): void {
    const index = this.selectedCategories.indexOf(categoryId);
    if (index > -1) {
      this.selectedCategories.splice(index, 1);
    } else {
      this.selectedCategories.push(categoryId);
    }
    //this.applyFilters();
  }

  isCategorySelected(categoryId: number): boolean {
    return this.selectedCategories.includes(categoryId);
  }

  toggleAllCategories(): void {
    if (this.isAllCategoriesSelected()) {
      this.selectedCategories = [];
    } else {
      this.selectedCategories = this.categories.map((c) => c.id);
    }
    //this.applyFilters();
  }

  isAllCategoriesSelected(): boolean {
    return this.categories.length > 0 && this.selectedCategories.length === this.categories.length;
  }

  isSomeCategoriesSelected(): boolean {
    return (
      this.selectedCategories.length > 0 && this.selectedCategories.length < this.categories.length
    );
  }

  // Price range filter
  onPriceRangeChange(value: [number, number]): void {
    this.priceRange = value;
    //this.applyFilters();
  }

  // Search
  onSearchChange(): void {
    this.loadProducts();
  }

  // Apply all filters
  applyFilters(): void {
    let filtered = [...this.products];

    // Filter by category
    if (this.selectedCategories.length > 0) {
      filtered = filtered.filter((p) => this.selectedCategories.includes(Number(p.category_id)));
    }

    // Filter by price range
    filtered = filtered.filter(
      (p) => p.price >= this.priceRange[0] && p.price <= this.priceRange[1]
    );

    // Filter by search query
    if (this.searchQuery.trim()) {
      const query = this.searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.productname.toLowerCase().includes(query) || p.description.toLowerCase().includes(query)
      );
    }

    this.filteredProducts = filtered;
    this.total = filtered.length;
    this.applySorting();
  }

  // Sorting
  onSortChange(value: string): void {
    this.sortBy = value;
    this.applySorting();
  }

  applySorting(): void {
    switch (this.sortBy) {
      case 'price-asc':
        this.filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        this.filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        this.filteredProducts.sort((a, b) => a.productname.localeCompare(b.productname));
        break;
      case 'name-desc':
        this.filteredProducts.sort((a, b) => b.productname.localeCompare(a.productname));
        break;
      default:
        // Keep default order
        break;
    }
  }

  // Clear filters
  clearAllFilters(): void {
    this.selectedCategories = [];
    this.priceRange = [0, this.maxPrice];
    this.searchQuery = '';
    this.sortBy = 'default';
    this.currentPage = 1;
    //this.applyFilters();
  }

  // Pagination
  onPageChange(page: number): void {
    this.currentPage = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
