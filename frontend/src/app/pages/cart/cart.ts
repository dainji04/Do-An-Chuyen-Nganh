import { Component, OnInit } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart/cart';

import { CartItem, cartItemsResponse } from '../../types/cart';
import { NzInputModule } from 'ng-zorro-antd/input';
import { Observable } from 'rxjs';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { Router } from '@angular/router';

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
    AsyncPipe,
    NzPaginationModule,
    NzCheckboxModule,
  ],
  templateUrl: './cart.html',
  // Styling migrated to Tailwind utility classes in the template
})
export class Cart implements OnInit {
  cartItems: CartItem[] = [];
  cartCount$!: Observable<number>;
  cartData!: cartItemsResponse;
  loading = false;
  selectedItems: Set<number> = new Set();
  allChecked = false;
  indeterminate = false;

  constructor(
    private message: NzMessageService,
    private modal: NzModalService,
    private cartService: CartService,
    private router: Router
  ) {
    this.cartCount$ = this.cartService.cartCount$;
  }

  ngOnInit(): void {
    this.loadCartItems();
  }

  loadCartItems(): void {
    this.loading = true;

    this.cartService.getCart().subscribe({
      next: (response) => {
        this.cartItems = response.cartItems.data;
        this.cartData = response.cartItems;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading cart:', error);
        this.message.error('Vui lòng đăng nhập để xem giỏ hàng');
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
    if (this.selectedItems.size === 0) {
      this.message.warning('Vui lòng chọn ít nhất một sản phẩm để thanh toán');
      return;
    }

    // Kiểm tra số tiền không được vượt quá 50 triệu VND
    if (this.getSelectedTotal() > 50000000) {
      this.message.warning('Số tiền thanh toán không được vượt quá 50,000,000 VND');
      return;
    }

    // Lưu các sản phẩm đã chọn vào localStorage
    const selectedCartItems = this.cartItems.filter((item) => this.selectedItems.has(item.id));
    localStorage.setItem('selectedCartItems', JSON.stringify(selectedCartItems));

    // Điều hướng đến trang checkout
    this.router.navigate(['/checkout']);
  }

  // Xử lý khi check/uncheck một item
  onItemChecked(itemId: number, checked: boolean): void {
    if (checked) {
      this.selectedItems.add(itemId);
    } else {
      this.selectedItems.delete(itemId);
    }
    this.updateCheckAllStatus();
  }

  // Xử lý khi check/uncheck tất cả
  onAllChecked(checked: boolean): void {
    this.cartItems.forEach((item) => {
      if (checked) {
        this.selectedItems.add(item.id);
      } else {
        this.selectedItems.delete(item.id);
      }
    });
    this.updateCheckAllStatus();
  }

  // Cập nhật trạng thái checkbox "Chọn tất cả"
  updateCheckAllStatus(): void {
    const selectedCount = this.selectedItems.size;
    this.allChecked = selectedCount === this.cartItems.length && this.cartItems.length > 0;
    this.indeterminate = selectedCount > 0 && selectedCount < this.cartItems.length;
  }

  // Kiểm tra xem item có được chọn không
  isItemSelected(itemId: number): boolean {
    return this.selectedItems.has(itemId);
  }

  // Tính tổng của các sản phẩm đã chọn
  getSelectedSubtotal(): number {
    return this.cartItems
      .filter((item) => this.selectedItems.has(item.id))
      .reduce((sum, item) => sum + this.getItemTotal(item), 0);
  }

  // Tính phí ship của các sản phẩm đã chọn
  getSelectedShippingFee(): number {
    return this.selectedItems.size > 0 ? 30000 : 0;
  }

  // Tính tổng tiền của các sản phẩm đã chọn
  getSelectedTotal(): number {
    return this.getSelectedSubtotal() + this.getSelectedShippingFee();
  }
}
