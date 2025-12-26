import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzMessageService } from 'ng-zorro-antd/message';
import { OrderService, Order } from '../../services/order/order';

interface UserInfo {
  id: number;
  username: string;
  fullname: string;
  email: string;
  numberphone: string;
  address: string;
  avatarimage?: string;
}

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    NzLayoutModule,
    NzMenuModule,
    NzIconModule,
    NzCardModule,
    NzDescriptionsModule,
    NzTableModule,
    NzButtonModule,
    NzModalModule,
    NzTagModule,
  ],
  templateUrl: './profile.html',
  styleUrls: ['./profile.scss'],
})
export class ProfileComponent implements OnInit {
  selectedMenu: string = 'info';
  userInfo: UserInfo | null = null;
  orders: Order[] = [];
  selectedOrder: Order | null = null;
  isOrderDetailModalVisible = false;
  loading = false;
  currentPage = 1;
  total = 0;

  constructor(private orderService: OrderService, private message: NzMessageService) {}

  ngOnInit(): void {
    this.loadUserInfo();
  }

  loadUserInfo(): void {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      this.userInfo = JSON.parse(userStr);
    }
  }

  onMenuSelect(menuKey: string): void {
    this.selectedMenu = menuKey;
    if (menuKey === 'orders') {
      this.loadOrderHistory();
    } else if (menuKey === 'info') {
      this.selectedMenu = 'info';
      this.loadUserInfo();
    }
  }

  loadOrderHistory(page: number = 1): void {
    this.loading = true;
    this.orderService.getOrderHistory(page).subscribe({
      next: (response) => {
        this.orders = response.data;
        this.currentPage = response.current_page;
        this.total = response.total;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading orders:', error);
        this.message.error('Không thể tải lịch sử đơn hàng');
        this.loading = false;
      },
    });
  }

  showOrderDetail(order: Order): void {
    this.selectedOrder = order;
    this.isOrderDetailModalVisible = true;
  }

  handleOrderDetailCancel(): void {
    this.isOrderDetailModalVisible = false;
    this.selectedOrder = null;
  }

  getStatusColor(status: string): string {
    const colors: { [key: string]: string } = {
      paid: 'green',
      unpaid: 'orange',
      pending: 'blue',
      processing: 'cyan',
      shipped: 'purple',
      delivered: 'green',
      cancelled: 'red',
    };
    return colors[status] || 'default';
  }

  getStatusText(status: string): string {
    const texts: { [key: string]: string } = {
      paid: 'Đã thanh toán',
      unpaid: 'Chưa thanh toán',
      pending: 'Chờ xác nhận',
      processing: 'Đang xử lý',
      shipped: 'Đang giao',
      delivered: 'Đã giao',
      cancelled: 'Đã hủy',
    };
    return texts[status] || status;
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(amount);
  }

  formatDate(date: string): string {
    return new Date(date).toLocaleString('vi-VN');
  }
}
