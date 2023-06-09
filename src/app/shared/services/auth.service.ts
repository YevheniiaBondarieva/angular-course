import { EventEmitter, Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, map, take, throwError } from 'rxjs';

import { User } from '../models/user.models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  statusChanged = new EventEmitter<boolean>();
  http = inject(HttpClient);
  router = inject(Router);

  login(email?: string, password?: string) {
    return this.http
      .post<{ [key: string]: string }>('http://localhost:3004/auth/login', {
        login: email,
        password,
      })
      .pipe(
        take(1),
        map((response): string => {
          console.log('logged in successfully');
          localStorage.setItem('token', response['token']);
          this.statusChanged.emit(true);
          this.router.navigate(['/courses']);
          return response['token'];
        }),
        catchError((error: HttpErrorResponse) => {
          console.error(error.message);
          return throwError(() => error);
        }),
      );
  }

  logout(): void {
    localStorage.removeItem('token');
    console.log('Logout');
    this.statusChanged.emit(false);
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }

  getUserInfo() {
    const token = localStorage.getItem('token');
    return this.http
      .post<User>('http://localhost:3004/auth/userinfo', { token })
      .pipe(
        catchError((errorRes) => {
          return throwError(() => errorRes);
        }),
      );
  }
}
