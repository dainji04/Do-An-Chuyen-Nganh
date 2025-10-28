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

export interface simpleDataProduct {
  curren_page: number;
  current_page_url: string;
  data: Product[];
  first_page_url: string;
  from: number;
  next_page_url: string;
  path: string;
  per_page: number;
  prev_page_url: string;
  to: number;
}
