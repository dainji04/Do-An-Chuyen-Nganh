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
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzRadioModule } from 'ng-zorro-antd/radio';

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
    FormsModule,
    NzInputModule,
    NzRadioModule,
  ],
  templateUrl: './cart.html',
  styleUrl: './cart.scss',
})
export class Cart implements OnInit {
  cartItems: CartItem[] = [];
  loading = false;
  radioValue = 'Momo';

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

  removeItem(item: CartItem): void {
    this.modal.confirm({
      nzTitle: 'Xác nhận xóa',
      nzContent: `Bạn có chắc muốn xóa "${item.name}" khỏi giỏ hàng?`,
      nzOkText: 'Xóa',
      nzOkDanger: true,
      nzCancelText: 'Hủy',
      nzOnOk: () => {
        this.cartService.removeFromCart(item.product_id).subscribe({
          next: () => {
            this.cartItems = this.cartItems.filter((i) => i.id !== item.id);
            this.message.success('Đã xóa sản phẩm khỏi giỏ hàng');
          },
          error: (error) => {
            console.error('Error removing item:', error);
            this.message.error('Không thể xóa sản phẩm');
          },
        });
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

  clearCart(): void {
    this.modal.confirm({
      nzTitle: 'Xác nhận xóa toàn bộ giỏ hàng',
      nzContent: 'Bạn có chắc muốn xóa tất cả sản phẩm trong giỏ hàng?',
      nzOkText: 'Xóa tất cả',
      nzOkDanger: true,
      nzCancelText: 'Hủy',
      nzOnOk: () => {
        this.cartService.clearCart().subscribe({
          next: () => {
            this.cartItems = [];
            this.message.success('Đã xóa toàn bộ giỏ hàng');
          },
          error: (error) => {
            console.error('Error clearing cart:', error);
            this.message.error('Không thể xóa giỏ hàng');
          },
        });
      },
    });
  }

  checkout(): void {
    if (this.cartItems.length === 0) {
      this.message.warning('Giỏ hàng trống');
      return;
    }
    // amount is not grater than 50,000,000 VND
    if (this.getTotal() > 50000000) {
      this.message.warning('Số tiền thanh toán không được vượt quá 50,000,000 VND');
      return;
    }

    const amount = this.getTotal().toString();
    const payUrl = 'http://localhost:3000/home';

    this.cartService.momoPayment(amount, payUrl).subscribe({
      next: (response) => {
        window.location.href = response.payUrl;
      },
      error: (error) => {
        console.error('Error during Momo payment:', error);
      },
    });
  }
}
