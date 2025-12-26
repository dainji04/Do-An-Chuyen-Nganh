import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NzCardModule } from 'ng-zorro-antd/card';

@Component({
  selector: 'app-thank-you',
  standalone: true,
  imports: [CommonModule, NzButtonModule, NzIconModule, NzResultModule, NzCardModule],
  templateUrl: './thank-you.html',
  styleUrls: ['./thank-you.scss'],
})
export class ThankYou implements OnInit {
  orderInfo: any = null;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Lấy thông tin đơn hàng từ state hoặc localStorage
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state) {
      this.orderInfo = navigation.extras.state['orderInfo'];
      // Lưu vào localStorage để giữ khi refresh
      localStorage.setItem('lastOrder', JSON.stringify(this.orderInfo));
    } else {
      // Nếu không có state, lấy từ localStorage
      const lastOrderStr = localStorage.getItem('lastOrder');
      if (lastOrderStr) {
        this.orderInfo = JSON.parse(lastOrderStr);
      }
    }
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(amount);
  }

  goToHome(): void {
    // Xóa thông tin đơn hàng đã lưu
    localStorage.removeItem('lastOrder');
    this.router.navigate(['/home']);
  }

  viewOrders(): void {
    // Xóa thông tin đơn hàng đã lưu
    localStorage.removeItem('lastOrder');
    // TODO: Chuyển đến trang đơn hàng của tôi
    this.router.navigate(['/home']);
  }
}
