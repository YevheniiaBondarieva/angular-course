import { EventEmitter, Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, map, throwError } from 'rxjs';

import { User } from '../models/user.models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  statusChanged = new EventEmitter<boolean>();
  http = inject(HttpClient);
  router = inject(Router);

  login(email?: string, password?: string) {
    this.http
      .post<{ [key: string]: string }>('http://localhost:3004/auth/login', {
        login: email,
        password,
      })
      .subscribe({
        next: (response) => {
          console.log(`logged in successfully`);
          localStorage.setItem('token', response['token']);
          this.statusChanged.emit(true);
          this.router.navigate(['/courses']);
        },
        error: (error: HttpErrorResponse) => {
          console.error(error.error);
        },
      });
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
        map((responseData) => {
          const name = `${responseData.name.first} ${responseData.name.last}`;
          return name;
        }),
        catchError((errorRes) => {
          return throwError(() => errorRes);
        }),
      );
  }
}
