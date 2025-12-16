interface res {
  current_page: number;
  first_page_url: string;
  from: number;
  next_page_url: string;
  path: string;
  per_page: number;
  prev_page_url: string;
  to: number;
}

export interface simplePaginateResponse extends res {
  current_page_url: string;
}

export interface paginateResponse extends res {
  last_page: number;
  last_page_url: string;
  total: number;
}
