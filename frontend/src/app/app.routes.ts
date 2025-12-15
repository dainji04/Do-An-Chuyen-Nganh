import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { DetailProduct } from './pages/detail-product/detail-product';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { Cart } from './pages/cart/cart';
import { About } from './pages/about/about';
import { Contact } from './pages/contact/contact';
import { ListProductsByCategory } from './pages/list-products-by-category/list-products-by-category';
import { SearchPage } from './pages/search-page/search-page';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: Home },
  { path: 'about', component: About },
  { path: 'contact', component: Contact },
  { path: 'product/:id', component: DetailProduct },
  { path: 'cart', component: Cart },
  { path: 'category/:id', component: ListProductsByCategory },
  { path: 'search', component: SearchPage },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
];
