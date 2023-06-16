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
    if (req.url.includes('/auth/login')) {
      return next.handle(req);
    }

    const token = localStorage.getItem('token') || '';

    const authReq = req.clone({
      headers: req.headers.append('Authorization', token),
    });

    return next.handle(authReq);
  }
}
