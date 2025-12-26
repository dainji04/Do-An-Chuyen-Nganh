import { inject, Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { Category } from '../../types/category';
import { HttpClient } from '@angular/common/http';

interface CategoryResponse {
  status: number;
  data: Category[];
}

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private apiUrl = 'http://localhost:8000 /api';
  private categories: Category[] = [];

  private http = inject(HttpClient);

  public async getCategories(): Promise<Category[]> {
    if (this.categories.length > 0) {
      return this.categories;
    }

    try {
      const response = await firstValueFrom(this.getCate());
      this.categories = response.data;
      return this.categories;
    } catch (error) {
      console.error('Error loading categories', error);
      return []; // Trả về mảng rỗng nếu lỗi
    }
  }

  public loadCate(): void {
    this.getCate().subscribe({
      next: async (response) => {
        this.categories = await response.data;
        console.log('Categories loaded:', this.categories);
      },
      error: () => {
        this.categories = [];
      },
    });
  }

  getCate(): Observable<CategoryResponse> {
    return this.http.get<CategoryResponse>(`${this.apiUrl}/categories`);
  }
}
