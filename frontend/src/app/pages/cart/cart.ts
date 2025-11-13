import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart/cart';

import { CartItem } from '../../types/cart';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    FormsModule,
    NzButtonModule,
    NzIconModule,
    NzInputNumberModule,
    NzEmptyModule,
    NzModalModule,
  ],
  templateUrl: './cart.html',
  styleUrl: './cart.scss',
})
export class Cart implements OnInit {
  cartItems: CartItem[] = [];
  loading = false;

  constructor(
    private message: NzMessageService,
    private modal: NzModalService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.loadCartItems();
  }

  loadCartItems(): void {
    this.loading = true;

    this.cartService.getCart().subscribe({
      next: (response) => {
        this.cartItems = response.cartItems;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading cart:', error);
        this.message.error('Không thể tải giỏ hàng');
        this.loading = false;
      },
    });
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(amount);
  }

  getItemTotal(item: CartItem): number {
    return item.price * item.quantity;
  }

  getSubtotal(): number {
    return this.cartItems.reduce((sum, item) => sum + this.getItemTotal(item), 0);
  }

  getShippingFee(): number {
    return this.cartItems.length > 0 ? 30000 : 0;
  }

  getTotal(): number {
    return this.getSubtotal() + this.getShippingFee();
  }

  checkout(): void {
    if (this.cartItems.length === 0) {
      this.message.warning('Giỏ hàng trống');
      return;
    }

    // TODO: Navigate to checkout page
    this.message.info('Chức năng thanh toán đang được phát triển');
  }
}
