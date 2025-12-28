import { Component, Input, inject } from '@angular/core';
import { CurrencyPipe, CommonModule } from '@angular/common';
import { Product } from '../../types/product';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart/cart';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-product-card-type',
  imports: [CurrencyPipe, CommonModule, RouterLink],
  templateUrl: './product-card-type.html',
  styleUrl: './product-card-type.scss',
})
export class ProductCardType {
  @Input() product!: Product;

  cartService = inject(CartService);
  isAddingToCart = false;
  private notification: NzNotificationService = inject(NzNotificationService);

  addToCart(event: Event) {
    event.preventDefault();
    event.stopPropagation();

    if (this.isAddingToCart) return;

    this.isAddingToCart = true;
    this.cartService.addToCart(Number(this.product.id), 1).subscribe({
      next: (response) => {
        this.notification.success('Thành công', 'Đã thêm sản phẩm vào giỏ hàng.');
        this.isAddingToCart = false;
      },
      error: (error) => {
        console.error('Error adding to cart:', error);
        this.notification.info(
          'Yêu cầu đăng nhập',
          'Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng.'
        );
        this.isAddingToCart = false;
      },
    });
  }

  buyNow(event: Event) {
    // Optional: Add to cart first, then navigate
    // For now, just navigate to product detail
    // The navigation is handled by routerLink
  }
}
