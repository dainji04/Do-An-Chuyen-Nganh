import { Component, Input } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { Product } from '../../types/product';

@Component({
  selector: 'app-product-item',
  imports: [CurrencyPipe],
  templateUrl: './product-item.html',
  styles: [
    `
      .product-0,
      .product-1 {
        color: #ffffff !important;
        background-color: #000000 !important;
      }
    `,
  ],
})
export class ProductItem {
  @Input() product!: Product;
  @Input() index!: number;
}
