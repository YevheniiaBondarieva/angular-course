/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    // Перевіряємо, чи ми не виконуємо логін API-виклик
    if (req.url.includes('/auth/login')) {
      // Пропускаємо запит без змін
      return next.handle(req);
    }

    // Отримуємо токен з localStorage
    const token = localStorage.getItem('token') || '';

    // Клонуємо запит і додаємо заголовок Authorization з токеном
    const authReq = req.clone({
      headers: req.headers.append('Authorization', token),
    });

    // Продовжуємо обробку клонованого запиту
    return next.handle(authReq);
  }
}
