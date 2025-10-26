import { Component, Input, CUSTOM_ELEMENTS_SCHEMA, ViewChild, ElementRef } from '@angular/core';
import { ProductItem } from '../product-item/product-item';
import { register } from 'swiper/element/bundle';
import { Product } from '../../types/product';

register();

@Component({
  selector: 'app-list-product',
  imports: [ProductItem],
  templateUrl: './list-product.html',
  styleUrl: './list-product.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ListProduct {
  @Input() products: Product[] = [];

  @ViewChild('swiper') swiperRef!: ElementRef;

  ngAfterViewInit() {
    // Swiper instance available here if needed
  }

  slidePrev() {
    this.swiperRef.nativeElement.swiper.slidePrev();
  }

  slideNext() {
    this.swiperRef.nativeElement.swiper.slideNext();
  }
}
