import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { simpleDataProduct } from '../../types/product';

@Injectable({
  providedIn: 'root',
})
export class Products {
  private apiUrl = 'http://localhost:8000/api/products';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<simpleDataProduct> {
    return this.http.get<simpleDataProduct>(this.apiUrl);
  }

  getProductById(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<any>(url);
  }

  getProductsByCategory(categoryName: string): Observable<simpleDataProduct> {
    const url = `${this.apiUrl}?category=${categoryName}`;
    return this.http.get<simpleDataProduct>(url);
  }

  searchProducts(keyword: string): Observable<simpleDataProduct> {
    const url = `${this.apiUrl}/search`;
    return this.http.post<simpleDataProduct>(url, { keyword });
  }
}
