import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { cartItemsResponse } from '../../types/cart';

export interface CartResponse {
  cartItems: cartItemsResponse;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private apiUrl = 'http://localhost:8000 /api';
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
          this.cartCountSubject.next(response.cartItems.total);
        },
        error: () => {
          this.cartCountSubject.next(0);
        },
      });
    }
  }

  momoPayment(amount: string, payUrl: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/momo-payment`, {
      amount: amount,
      payUrl: payUrl,
    });
  }

  /**
   * Get all cart items
   */
  getCart(): Observable<CartResponse> {
    return this.http.get<CartResponse>(`${this.apiUrl}/cart`);
  }

  /**
   * Add product to cart
   */
  addToCart(productId: number, quantity: number = 1): Observable<any> {
    return this.http
      .post<any>(`${this.apiUrl}/cart`, {
        product_id: productId,
        quantity: quantity,
      })
      .pipe(
        tap((response) => {
          this.cartCountSubject.next(response.cartCount);
        })
      );
  }

  /**
   * Update cart item quantity
   */
  updateCartItem(productId: number, quantity: number): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/cart/update`, {
      product_id: productId,
      quantity: quantity,
    });
  }

  /**
   * Remove item from cart
   */
  removeFromCart(productId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/cart/${productId}`).pipe(
      tap((response) => {
        this.cartCountSubject.next(response.cartCount);
      })
    );
  }

  /**
   * Clear entire cart
   */
  clearCart(): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/cart/clear`).pipe(
      tap((response) => {
        this.cartCountSubject.next(response.cartCount);
      })
    );
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
