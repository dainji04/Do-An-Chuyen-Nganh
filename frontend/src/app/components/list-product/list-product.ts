import { Component, Input, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
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
}
