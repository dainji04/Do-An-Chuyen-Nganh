import { inject } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
  HttpHandlerFn,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

export function AuthInterceptor(
  request: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  // Lấy token từ localStorage
  const token = localStorage.getItem('auth_token');
  const router = inject(Router);
  // Clone request và thêm headers
  let modifiedRequest = request.clone({
    setHeaders: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });

  // Thêm Authorization header nếu có token
  if (token) {
    modifiedRequest = modifiedRequest.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  return next(modifiedRequest).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        // Token invalid hoặc expired
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user');
        localStorage.removeItem('token_expiry');
        localStorage.removeItem('last_login');
        router.navigate(['/login']);
      }

      return throwError(() => error);
    })
  );
}
