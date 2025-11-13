import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter, withInMemoryScrolling, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { en_US, provideNzI18n } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideNzIcons } from 'ng-zorro-antd/icon';
import {
  ShoppingCartOutline,
  UserOutline,
  MailOutline,
  LockOutline,
  PhoneOutline,
  EyeOutline,
  EyeInvisibleOutline,
  SettingOutline,
  LogoutOutline,
  DeleteOutline,
  CloseCircleOutline,
  CreditCardOutline,
  ArrowLeftOutline,
  SafetyCertificateOutline,
  ShoppingOutline,
} from '@ant-design/icons-angular/icons';
import { AuthInterceptor } from './interceptor/auth';

registerLocaleData(en);

const icons = [
  ShoppingCartOutline,
  UserOutline,
  MailOutline,
  LockOutline,
  PhoneOutline,
  EyeOutline,
  EyeInvisibleOutline,
  SettingOutline,
  LogoutOutline,
  DeleteOutline,
  CloseCircleOutline,
  CreditCardOutline,
  ArrowLeftOutline,
  SafetyCertificateOutline,
  ShoppingOutline,
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      withViewTransitions(),
      withInMemoryScrolling({
        scrollPositionRestoration: 'top',
        anchorScrolling: 'enabled',
      })
    ),
    provideNzI18n(en_US),
    provideAnimationsAsync(),
    provideHttpClient(),
    provideNzIcons(icons),
    provideHttpClient(withInterceptors([AuthInterceptor])),
  ],
};
