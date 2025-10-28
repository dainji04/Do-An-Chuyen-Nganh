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
}
