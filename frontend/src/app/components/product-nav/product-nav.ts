import { Component } from '@angular/core';

@Component({
  selector: 'app-product-nav',
  imports: [],
  templateUrl: './product-nav.html',
  styleUrl: './product-nav.scss',
})
export class ProductNav {
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
}
