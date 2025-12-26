import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-nav',
  imports: [],
  templateUrl: './product-nav.html',
  styleUrl: './product-nav.scss',
})
export class ProductNav implements OnInit {
  categories = [
    {
      id: 'samsung',
      name: 'samsung',
      image: 'productNav/samsung.png',
      link: '/samsung',
    },
    {
      id: 'oppo',
      name: 'oppo',
      image: 'productNav/oppo.png',
      link: '/oppo',
    },
  ];

  private http: any = inject(HttpClient);

  ngOnInit(): void {
    this.http.get('http://localhost:8000 /api/categories').subscribe((response: any) => {
      this.categories = response.data;
      console.log(response);
    });
  }
}
