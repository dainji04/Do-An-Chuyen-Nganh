import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { RouterLink } from '@angular/router';
import { User } from '../../types/user';
import { Auth } from '../../services/auth/auth';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { CartService } from '../../services/cart/cart';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [NzIconModule, RouterLink, NzAvatarModule, NzDropDownModule, NzBadgeModule, AsyncPipe],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header implements OnInit {
  user: User | null = null;
  public cartCount$!: Observable<number>;

  private authService: Auth = inject(Auth);
  private cartService: CartService = inject(CartService);
  constructor() {
    this.user = this.authService.getCurrentUser();
  }

  async ngOnInit(): Promise<void> {
    this.cartCount$ = this.cartService.cartCount$;
  }

  logout(event: Event): void {
    event.stopPropagation();
    this.authService.logout().subscribe({
      next: () => {
        alert('Đăng xuất thành công');
        // Thực hiện chuyển hướng hoặc cập nhật giao diện người dùng sau khi đăng xuất
      },
      error: (err) => {
        alert('Lỗi khi đăng xuất');
        console.log(err);
      },
    });
  }

  goToProfile(event: Event): void {
    event.stopPropagation();
    console.log('Profile clicked');
  }

  goToSettings(event: Event): void {
    event.stopPropagation();
    console.log('Settings clicked');
  }
}
