import { Component } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { Header } from './layouts/header/header';
import { Footer } from './layouts/footer/footer';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  showHeaderFooter = true;

  constructor(private router: Router) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        // Ẩn header/footer cho các route: /login, /register
        const hideLayoutRoutes = ['/login', '/register'];
        this.showHeaderFooter = !hideLayoutRoutes.includes(event.urlAfterRedirects);
      });
  }
}
