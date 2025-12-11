import {
  Component,
  Input,
  CUSTOM_ELEMENTS_SCHEMA,
  ViewChild,
  ElementRef,
  inject,
} from '@angular/core';
import { ProductItem } from '../product-item/product-item';
import { register } from 'swiper/element/bundle';
import { Product, simpleDataProduct } from '../../types/product';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { Products } from '../../services/products/products';

register();

@Component({
  selector: 'app-list-product',
  imports: [ProductItem, NzSkeletonModule, NzIconModule],
  templateUrl: './list-product.html',
  styleUrl: './list-product.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ListProduct {
  // component.ts
  isLoading = true; // Set false khi API trả về
  skeletonItems = new Array(4).fill(0); // Tạo mảng giả để loop skeleton
  products: Product[] = [];
  productService = inject(Products);

  @ViewChild('swiper') swiperRef!: ElementRef;

  slidePrev() {
    this.swiperRef.nativeElement.swiper.slidePrev();
  }

  slideNext() {
    this.swiperRef.nativeElement.swiper.slideNext();
  }

  constructor() {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.productService.getProducts().subscribe({
      next: (data: simpleDataProduct) => {
        this.products = data.data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching products:', error);
        this.isLoading = false;
      },
    });
  }
}
