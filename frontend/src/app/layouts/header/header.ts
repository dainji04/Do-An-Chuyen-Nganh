import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NavigationEnd, NavigationStart, Router, RouterEvent, RouterLink } from '@angular/router';
import { User } from '../../types/user';
import { Auth } from '../../services/auth/auth';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { CartService } from '../../services/cart/cart';
import { filter, Observable, Subject, takeUntil } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { NzMessageService } from 'ng-zorro-antd/message';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { trigger, style, transition, animate } from '@angular/animations';
import { CategoryService } from '../../services/category/category';
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
  categories: any[] = [];
  isShowSearch: boolean = false;
  isShowCategories: boolean = false;
  private categoriesTimeout: any;

  private destroy$ = new Subject<void>();

  private authService: Auth = inject(Auth);
  private cartService: CartService = inject(CartService);
  private message = inject(NzMessageService);
  private router = inject(Router);
  // private http = inject(HttpClient);
  private categoryService = inject(CategoryService);

  constructor() {
    this.user = this.authService.getCurrentUser();
  }

  async ngOnInit(): Promise<void> {
    this.cartCount$ = this.cartService.cartCount$;
    await this.loadCategories();
    this.getQuickLinkUrl();

    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        if (this.isShowSearch) {
          this.isShowSearch = false;
        }
      });
  }

  clearSearch() {
    this.searchText = '';
    this.searchInput.nativeElement.focus();
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
    this.router.navigate(['/profile']);
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
    this.categories.forEach((category: any) => {
      this.quickLinks.push({
        label: category.name,
        url: category.link,
      });
    });
  }

  async loadCategories(): Promise<void> {
    this.categories = await this.categoryService.getCategories();
  }

  showCategoriesDropdown() {
    if (this.categoriesTimeout) {
      clearTimeout(this.categoriesTimeout);
    }
    this.isShowCategories = true;
  }

  hideCategoriesDropdown() {
    this.categoriesTimeout = setTimeout(() => {
      this.isShowCategories = false;
    }, 200);
  }

  showSearchBar() {
    this.isShowSearch = !this.isShowSearch;
    if (this.isShowSearch) {
      setTimeout(() => {
        this.searchInput.nativeElement.focus();
      }, 0);
    }
  }

  xulyTim(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    let params = {
      keyword: value,
      page: 1,
      limit: 10,
    };
    this.router.navigate(['/search'], { queryParams: params });
  }
}
