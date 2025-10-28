import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  OnInit,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Products } from '../../services/products/products';
import { DetailProduct as typeProduct } from '../../types/product';
import { CurrencyPipe } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { Breadcrumb } from '../../components/breadcrumb/breadcrumb';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { Faq } from '../../components/faq/faq';
import { NzNotificationService } from 'ng-zorro-antd/notification';

interface OrderForm {
  productId: number;
  quantity: number;
  price: number;
  total: number;
}

@Component({
  selector: 'app-detail-product',
  imports: [
    CurrencyPipe,
    NzButtonModule,
    NzIconModule,
    NzBadgeModule,
    NzCardModule,
    Breadcrumb,
    NzDividerModule,
    Faq,
  ],
  templateUrl: './detail-product.html',
  styleUrl: './detail-product.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DetailProduct implements OnInit {
  productId: number = 0;
  product!: typeProduct;
  @ViewChild('swiper') swiperRef!: ElementRef;
  private productService: any = inject(Products);
  dataFormOrder: OrderForm = {
    productId: 0,
    quantity: 1,
    price: 0,
    total: 0,
  };
  isLoadingOrder: boolean = false;
  isLoadingAddToCart: boolean = false;

  constructor(private route: ActivatedRoute, private notification: NzNotificationService) {
    const id: string | null = this.route.snapshot.paramMap.get('id');
    this.productId = id ? +id : 0;
  }

  ngOnInit(): void {
    this.productService.getProductById(this.productId).subscribe({
      next: (data: any) => {
        console.log('Product data:', data);
        this.product = data;
        this.dataFormOrder.productId = this.productId;
        this.dataFormOrder.price = this.product.price;
      },
      error: (error: any) => {
        console.error('Error fetching product data:', error);
      },
    });
  }

  loadAddToCart(): void {
    this.isLoadingAddToCart = true;
    setTimeout(() => {
      this.isLoadingAddToCart = false;
      this.createNotification(
        'success',
        'Added to Cart',
        'The product has been added to your cart successfully.'
      );
    }, 5000);
  }

  loadOrderNow(): void {
    this.isLoadingOrder = true;
    setTimeout(() => {
      this.isLoadingOrder = false;
      this.createNotification(
        'success',
        'Order Placed',
        'Your order has been placed successfully.'
      );
    }, 5000);
  }

  createNotification(type: string, title: string, detail: string): void {
    this.notification.create(type, title, detail);
  }

  // swiper config
  slidePrev() {
    this.swiperRef.nativeElement.swiper.slidePrev();
  }

  slideNext() {
    this.swiperRef.nativeElement.swiper.slideNext();
  }
}
