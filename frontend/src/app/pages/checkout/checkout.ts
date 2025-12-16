import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzCardModule } from 'ng-zorro-antd/card';
import { CartService } from '../../services/cart/cart';
import { CartItem } from '../../types/cart';

interface UserInfo {
  username: string;
  fullname: string;
  email: string;
  numberphone: string;
  address: string;
}

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ReactiveFormsModule,
    FormsModule,
    NzButtonModule,
    NzIconModule,
    NzInputModule,
    NzRadioModule,
    NzFormModule,
    NzCardModule,
  ],
  templateUrl: './checkout.html',
})
export class Checkout implements OnInit {
  checkoutForm!: FormGroup;
  userInfo: UserInfo | null = null;
  selectedItems: CartItem[] = [];
  paymentMethod: string = 'cod';
  loading = false;
  submitting = false;

  constructor(
    private fb: FormBuilder,
    private message: NzMessageService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Lấy thông tin user từ localStorage hoặc service
    this.loadUserInfo();

    // Lấy các sản phẩm đã chọn từ service
    this.loadSelectedItems();

    // Khởi tạo form với validation
    this.initForm();
  }

  loadUserInfo(): void {
    // Giả sử bạn lưu user info trong localStorage
    const userStr = localStorage.getItem('user');
    if (userStr) {
      this.userInfo = JSON.parse(userStr);
    } else {
      this.message.error('Vui lòng đăng nhập để tiếp tục');
      this.router.navigate(['/login']);
    }
  }

  loadSelectedItems(): void {
    // Lấy các sản phẩm đã chọn từ cart service
    const selectedItemsStr = localStorage.getItem('selectedCartItems');
    if (selectedItemsStr) {
      this.selectedItems = JSON.parse(selectedItemsStr);
    }

    if (this.selectedItems.length === 0) {
      this.message.warning('Vui lòng chọn sản phẩm để thanh toán');
      this.router.navigate(['/cart']);
    }
  }

  initForm(): void {
    this.checkoutForm = this.fb.group({
      address: [
        this.userInfo?.address || '',
        [Validators.required, Validators.minLength(10), Validators.maxLength(200)],
      ],
      note: ['', [Validators.maxLength(500)]],
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
    return this.selectedItems.reduce((sum, item) => sum + this.getItemTotal(item), 0);
  }

  getShippingFee(): number {
    return this.selectedItems.length > 0 ? 30000 : 0;
  }

  getTotal(): number {
    return this.getSubtotal() + this.getShippingFee();
  }

  onPaymentMethodChange(value: string): void {
    this.paymentMethod = value;
  }

  submitOrder(): void {
    // Validate form
    if (this.checkoutForm.invalid) {
      Object.values(this.checkoutForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
      this.message.error('Vui lòng kiểm tra lại thông tin');
      return;
    }

    // Kiểm tra số tiền
    if (this.getTotal() > 50000000) {
      this.message.warning('Số tiền thanh toán không được vượt quá 50,000,000 VND');
      return;
    }

    this.submitting = true;

    const orderData = {
      address: this.checkoutForm.value.address,
      note: this.checkoutForm.value.note,
      total: this.getTotal(),
      items: this.selectedItems.map((item) => ({
        product_id: item.product_id,
        quantity: item.quantity,
        price: item.price,
      })),
      payment_method: this.paymentMethod,
    };

    // Nếu chọn Momo
    if (this.paymentMethod === 'momo') {
      const amount = this.getTotal().toString();
      const payUrl = 'http://localhost:3000/home';

      this.cartService.momoPayment(amount, payUrl).subscribe({
        next: (response) => {
          // Xóa selected items khỏi localStorage
          localStorage.removeItem('selectedCartItems');
          window.location.href = response.payUrl;
        },
        error: (error) => {
          console.error('Error during Momo payment:', error);
          this.message.error('Có lỗi xảy ra khi thanh toán với Momo');
          this.submitting = false;
        },
      });
    } else {
      // Thanh toán khi nhận hàng (COD)
      // TODO: Gọi API để tạo order
      console.log('Order data:', orderData);

      // Giả lập API call
      setTimeout(() => {
        this.message.success('Đặt hàng thành công! Cảm ơn bạn đã mua hàng.');
        localStorage.removeItem('selectedCartItems');
        this.submitting = false;
        this.router.navigate(['/home']);
      }, 1500);
    }
  }

  cancel(): void {
    this.router.navigate(['/cart']);
  }
}
