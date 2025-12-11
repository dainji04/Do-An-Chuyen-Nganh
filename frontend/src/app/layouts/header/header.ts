import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { Router, RouterLink } from '@angular/router';
import { User } from '../../types/user';
import { Auth } from '../../services/auth/auth';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { CartService } from '../../services/cart/cart';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { NzMessageService } from 'ng-zorro-antd/message';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { trigger, style, transition, animate } from '@angular/animations';
interface QuickLink {
  label: string;
  url: string;
}

@Component({
  selector: 'app-header',
  imports: [
    NzIconModule,
    RouterLink,
    NzAvatarModule,
    NzDropDownModule,
    NzBadgeModule,
    AsyncPipe,
    FormsModule,
  ],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ height: '0px', opacity: 0, overflow: 'hidden' }),
        animate('300ms cubic-bezier(0.4, 0.0, 0.2, 1)', style({ height: '*', opacity: 1 })),
      ]),
      transition(':leave', [
        style({ height: '*', opacity: 1, overflow: 'hidden' }),
        animate('250ms cubic-bezier(0.4, 0.0, 0.2, 1)', style({ height: '0px', opacity: 0 })),
      ]),
    ]),
    trigger('overlayFade', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-in', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('250ms ease-out', style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class Header implements OnInit {
  user: User | null = null;
  public cartCount$!: Observable<number>;
  @ViewChild('searchInput') searchInput!: ElementRef;

  searchText: string = '';

  quickLinks: QuickLink[] = [];
  isShowSearch: boolean = false;

  private authService: Auth = inject(Auth);
  private cartService: CartService = inject(CartService);
  private message = inject(NzMessageService);
  private router = inject(Router);
  private http = inject(HttpClient);
  constructor() {
    this.user = this.authService.getCurrentUser();
  }

  clearSearch() {
    this.searchText = '';
    this.searchInput.nativeElement.focus();
  }

  async ngOnInit(): Promise<void> {
    this.cartCount$ = this.cartService.cartCount$;
    this.getQuickLinkUrl();
  }

  logout(event: Event): void {
    event.stopPropagation();
    this.authService.logout().subscribe({
      next: () => {
        this.message.success('Đăng xuất thành công!');
      },
      error: (err) => {
        this.message.error('Đăng xuất thất bại!');
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

  GotoOrders(event: Event): void {
    if (!this.authService.isLoggedIn()) {
      event.stopPropagation();
      this.message.info('Vui lòng đăng nhập để xem đơn hàng của bạn.');
    } else {
      // Navigate to orders page
      this.router.navigate(['cart']);
    }
  }

  getQuickLinkUrl() {
    this.http.get('http://localhost:8000/api/categories').subscribe((response: any) => {
      response.data.forEach((category: any) => {
        this.quickLinks.push({
          label: category.name,
          url: category.link,
        });
      });
    });
  }
}
