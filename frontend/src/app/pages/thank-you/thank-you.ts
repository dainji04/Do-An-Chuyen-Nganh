import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NzCardModule } from 'ng-zorro-antd/card';
import { OrderService } from '../../services/order/order';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-thank-you',
  standalone: true,
  imports: [CommonModule, NzButtonModule, NzIconModule, NzResultModule, NzCardModule],
  templateUrl: './thank-you.html',
  styleUrls: ['./thank-you.scss'],
})
export class ThankYou implements OnInit {
  orderInfo: any = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private orderService: OrderService,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    // Kiểm tra xem có callback từ Momo không
    this.route.queryParams.subscribe((params) => {
      // Nếu có resultCode từ Momo (callback từ Momo)
      if (params['resultCode']) {
        this.handleMomoCallback(params);
      } else {
        // Lấy thông tin đơn hàng từ state hoặc localStorage (COD)
        this.loadOrderInfo();
      }
    });
  }

  handleMomoCallback(params: any): void {
    const resultCode = params['resultCode'];
    const orderId = localStorage.getItem('pendingMomoOrderId');

    if (orderId) {
      if (resultCode === '0') {
        // Thanh toán thành công, cập nhật trạng thái order
        this.orderService.updatePaymentStatus(parseInt(orderId), 'paid').subscribe({
          next: (response) => {
            this.orderInfo = response.order;
            this.message.success('Thanh toán thành công!');
            localStorage.removeItem('pendingMomoOrderId');
          },
          error: (error) => {
            console.error('Error updating payment status:', error);
            this.message.warning('Đơn hàng đã được tạo nhưng chưa cập nhật trạng thái thanh toán');
            this.loadOrderInfo();
          },
        });
      } else {
        // Thanh toán thất bại
        this.message.error('Thanh toán thất bại. Đơn hàng vẫn được lưu với trạng thái chưa thanh toán.');
        // Vẫn hiển thị thông tin đơn hàng
        this.orderService.getOrderDetail(parseInt(orderId)).subscribe({
          next: (order) => {
            this.orderInfo = order;
          },
          error: () => {
            this.loadOrderInfo();
          },
        });
      }
    } else {
      this.loadOrderInfo();
    }
  }

  loadOrderInfo(): void {
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
    localStorage.removeItem('pendingMomoOrderId');
    // Chuyển đến trang profile với tab orders
    this.router.navigate(['/profile']);
  }
}
