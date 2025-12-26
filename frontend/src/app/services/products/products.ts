import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ProductResponse } from '../../types/product';

@Injectable({
  providedIn: 'root',
})
export class Products {
  private apiUrl = 'http://localhost:8000/api/products';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<ProductResponse> {
    return this.http.get<ProductResponse>(this.apiUrl);
  }

  getProductById(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<any>(url);
  }

  getProductsByCategory(categoryName: string): Observable<ProductResponse> {
    const url = `${this.apiUrl}?category=${categoryName}`;
    return this.http.get<ProductResponse>(url);
  }

  searchProducts(keyword: string): Observable<ProductResponse> {
    const url = `${this.apiUrl}/search`;
    return this.http.post<ProductResponse>(url, { keyword });
  }
}
