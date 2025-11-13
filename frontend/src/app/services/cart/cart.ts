import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CartItem } from '../../types/cart';

export interface CartResponse {
  cartItems: CartItem[];
  cartCount: number;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private apiUrl = 'http://localhost:8000/api';
  private cartCountSubject = new BehaviorSubject<number>(0);
  public cartCount$ = this.cartCountSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadCartCount();
  }

  private loadCartCount(): void {
    const token = localStorage.getItem('auth_token');
    if (token) {
      this.getCart().subscribe({
        next: (response) => {
          this.cartCountSubject.next(response.cartCount);
        },
        error: () => {
          this.cartCountSubject.next(0);
        },
      });
    }
  }

  /**
   * Get all cart items
   */
  getCart(): Observable<CartResponse> {
    return this.http.get<CartResponse>(`${this.apiUrl}/cart`);
  }

  /**
   * Get current cart count
   */
  getCartCount(): number {
    return this.cartCountSubject.value;
  }

  /**
   * Update cart count manually
   */
  updateCartCount(count: number): void {
    this.cartCountSubject.next(count);
  }
}
