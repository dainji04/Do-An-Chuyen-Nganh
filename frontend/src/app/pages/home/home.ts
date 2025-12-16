import { Component } from '@angular/core';
import { TitleListProduct } from '../../components/title-list-product/title-list-product';
import { ListProduct } from '../../components/list-product/list-product';
import { ProductNav } from '../../components/product-nav/product-nav';
import { ListProductType } from '../../components/list-product-type/list-product-type';

@Component({
  selector: 'app-home',
  imports: [TitleListProduct, ListProduct, ProductNav, ListProductType],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {}
