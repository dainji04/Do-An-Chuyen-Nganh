import { Component, Input, OnInit, inject } from '@angular/core';
import { ProductCardType } from '../product-card-type/product-card-type';
import { Product } from '../../types/product';
import { Products } from '../../services/products/products';

@Component({
  selector: 'app-list-product-type',
  imports: [ProductCardType],
  templateUrl: './list-product-type.html',
  styleUrl: './list-product-type.scss',
})
export class ListProductType implements OnInit {
  @Input() categoryId!: number;
  @Input() categoryName: string = '';

  products: Product[] = [];
  productService = inject(Products);
  isLoading = false;

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    if (!this.categoryName) return;

    this.isLoading = true;
    this.productService.getProductsByCategory(this.categoryName).subscribe({
      next: (data) => {
        this.products = data.data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching products by category:', error);
        this.isLoading = false;
      },
    });
  }
}
