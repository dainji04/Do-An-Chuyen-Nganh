import { Component, OnInit } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { Header } from './layouts/header/header';
import { Footer } from './layouts/footer/footer';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';

declare var SmoothScroll: any;

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
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

  ngOnInit() {
    // Init SmoothScroll sau khi component load
    if (typeof SmoothScroll !== 'undefined') {
      SmoothScroll({
        animationTime: 800,
        stepSize: 100,
        accelerationDelta: 50,
        accelerationMax: 3,
        keyboardSupport: true,
        arrowScroll: 50,
      });
    }
  }
}
