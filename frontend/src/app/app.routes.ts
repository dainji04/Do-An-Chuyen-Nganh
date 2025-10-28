import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { DetailProduct } from './pages/detail-product/detail-product';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: Home },
  { path: 'product/:id', component: DetailProduct },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
];
