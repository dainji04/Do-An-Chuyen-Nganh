import { Component, inject, ViewChild } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { RouterLink } from '@angular/router';
import { User } from '../../types/user';
import { Auth } from '../../services/auth/auth';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzBadgeModule } from 'ng-zorro-antd/badge';

@Component({
  selector: 'app-header',
  imports: [NzIconModule, RouterLink, NzAvatarModule, NzDropDownModule, NzBadgeModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  user: User | null = null;

  private authService: Auth = inject(Auth);
  constructor() {
    this.user = this.authService.getCurrentUser();
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
