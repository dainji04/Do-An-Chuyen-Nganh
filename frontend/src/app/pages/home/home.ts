import { Component, inject, OnInit } from '@angular/core';
import { TitleListProduct } from '../../components/title-list-product/title-list-product';
import { ProductItem } from '../../components/product-item/product-item';
import { ListProduct } from '../../components/list-product/list-product';
import { Product, simpleDataProduct } from '../../types/product';
import { Products } from '../../services/products/products';
import { ProductNav } from '../../components/product-nav/product-nav';

@Component({
  selector: 'app-home',
  imports: [TitleListProduct, ListProduct, ProductNav],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {
  products: Product[] = [];

  productService = inject(Products);

  constructor() {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.productService.getProducts().subscribe({
      next: (data: simpleDataProduct) => {
        this.products = data.data;
      },
      error: (error) => {
        console.error('Error fetching products:', error);
      },
    });
  }
}
