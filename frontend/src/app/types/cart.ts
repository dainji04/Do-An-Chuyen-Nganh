export interface CartItem {
  id: number;
  product_id: number;
  quantity: number;
  name: string;
  price: number;
  image: string;
  description: string;
}

export interface cartItemsResponse {
  current_page: number;
  data: CartItem[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  next_page_url: string | null;
  total: number;
  per_page: number;
}
