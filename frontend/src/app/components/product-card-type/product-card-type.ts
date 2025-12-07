import { Component, Input, inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { Product } from '../../types/product';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart/cart';

@Component({
  selector: 'app-product-card-type',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './product-card-type.html',
  styleUrl: './product-card-type.scss',
})
export class ProductCardType {
  @Input() product!: Product;

  cartService = inject(CartService);
  isAddingToCart = false;

  addToCart(event: Event) {
    event.preventDefault();
    event.stopPropagation();

    if (this.isAddingToCart) return;

    this.isAddingToCart = true;
    this.cartService.addToCart(Number(this.product.id), 1).subscribe({
      next: (response) => {
        console.log('Added to cart:', response);
        this.isAddingToCart = false;
      },
      error: (error) => {
        console.error('Error adding to cart:', error);
        this.isAddingToCart = false;
      },
    });
  }
}
