import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface OrderItem {
  product_id: number;
  quantity: number;
  price: number;
}

export interface CreateOrderRequest {
  total: number;
  address: string;
  note?: string;
  promotion_id?: number;
  items: OrderItem[];
}

export interface OrderDetail {
  id: number;
  order_id: number;
  product_id: number;
  quantity: number;
  price: number;
  total: number;
  product: {
    id: number;
    productname: string;
    image: string;
    price: number;
    description?: string;
  };
}

export interface Order {
  id: number;
  user_id: number;
  total: number;
  promotion_id?: number;
  note?: string;
  process: string;
  status: string;
  address: string;
  created_at: string;
  updated_at: string;
  orderdetails: OrderDetail[];
  promotion?: any;
}

export interface OrderHistoryResponse {
  data: Order[];
  current_page: number;
  last_page: number;
  total: number;
}

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
  }

  createOrder(orderData: CreateOrderRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/orders`, orderData, {
      headers: this.getHeaders(),
    });
  }

  getOrderHistory(page: number = 1): Observable<OrderHistoryResponse> {
    return this.http.get<OrderHistoryResponse>(`${this.apiUrl}/orders?page=${page}`, {
      headers: this.getHeaders(),
    });
  }

  getOrderDetail(orderId: number): Observable<Order> {
    return this.http.get<Order>(`${this.apiUrl}/orders/${orderId}`, {
      headers: this.getHeaders(),
    });
  }

  updatePaymentStatus(orderId: number, status: string): Observable<any> {
    return this.http.put(
      `${this.apiUrl}/orders/${orderId}/payment-status`,
      { status },
      {
        headers: this.getHeaders(),
      }
    );
  }
}
