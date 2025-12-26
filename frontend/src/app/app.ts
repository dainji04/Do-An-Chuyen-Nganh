import { Component, OnInit } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { Header } from './layouts/header/header';
import { Footer } from './layouts/footer/footer';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';

import AOS from 'aos';
import { NzFloatButtonModule } from 'ng-zorro-antd/float-button';
declare var SmoothScroll: any;

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, CommonModule, NzFloatButtonModule],
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
        const hideLayoutRoutes = ['/login', '/register', '/auth/callback'];
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

      AOS.init({
        duration: 1000, // Animation duration
        easing: 'ease-in-out', // Easing function
        once: true, // Animation chỉ chạy 1 lần
        offset: 120, // Offset từ trigger point
        delay: 100, // Delay animation
      });
    }
  }
}
