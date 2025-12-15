import { simplePaginateResponse } from './simplePaginateResponse';

interface rawProduct {
  id: string;
  category_id: string;
  productname: string;
  price: number;
  discount: number;
  quantity: number;
  description: string;
  guarantee: string;
  status: string;
  detail: string;
  created_at: string;
  updated_at: string;
}

export interface Product extends rawProduct {
  image: string;
}

export interface DetailProduct extends rawProduct {
  images: imageProduct[];
}

interface imageProduct {
  product_id: number;
  image: string;
}

export interface simpleDataProduct extends simplePaginateResponse {
  data: Product[];
}
