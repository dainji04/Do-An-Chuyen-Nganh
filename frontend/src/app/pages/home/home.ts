import { Component, inject, OnInit } from '@angular/core';
import { TitleListProduct } from '../../components/title-list-product/title-list-product';
import { ProductItem } from '../../components/product-item/product-item';
import { ListProduct } from '../../components/list-product/list-product';
import { Product, simpleDataProduct } from '../../types/product';
import { Products } from '../../services/products/products';
import { ProductNav } from '../../components/product-nav/product-nav';
import { ListProductType } from '../../components/list-product-type/list-product-type';

@Component({
  selector: 'app-home',
  imports: [TitleListProduct, ListProduct, ProductNav, ListProductType],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {}
