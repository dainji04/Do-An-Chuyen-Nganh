import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { DetailProduct } from './pages/detail-product/detail-product';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { Cart } from './pages/cart/cart';
import { Checkout } from './pages/checkout/checkout';
import { ThankYou } from './pages/thank-you/thank-you';
import { About } from './pages/about/about';
import { Contact } from './pages/contact/contact';
import { ListProductsByCategory } from './pages/list-products-by-category/list-products-by-category';
import { SearchPage } from './pages/search-page/search-page';
import { AuthCallbackComponent } from './pages/auth-callback/auth-callback';
import { ProfileComponent } from './pages/profile/profile';

export const routes: Routes = [
  { path: 'home', component: Home },
  { path: 'about', component: About },
  { path: 'contact', component: Contact },
  { path: 'product/:id', component: DetailProduct },
  { path: 'cart', component: Cart },
  { path: 'checkout', component: Checkout },
  { path: 'thank-you', component: ThankYou },
  { path: 'profile', component: ProfileComponent },
  { path: 'category/:id', component: ListProductsByCategory },
  { path: 'search', component: SearchPage },
  { path: 'login', component: Login },
  { path: 'auth/callback', component: AuthCallbackComponent }, // Route trùng với config Google Console
  { path: 'register', component: Register },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];
