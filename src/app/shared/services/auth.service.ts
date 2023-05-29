import { EventEmitter, Injectable } from '@angular/core';

@Injectable()
export class AuthService {
  statusChanged = new EventEmitter<boolean>();
  login(email?: string, password?: string) {
    const token = Math.random().toString(36).substring(2);
    localStorage.setItem('user', JSON.stringify({ email, password }));
    localStorage.setItem('token', token);
    console.log(`logged in successfully`);
    this.statusChanged.emit(true);
  }
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    console.log('Logout');
    this.statusChanged.emit(false);
  }
  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }
  getUserInfo(
    email: string,
  ): { email?: string; password?: string } | undefined {
    const loginUser = JSON.parse(localStorage.getItem('user') || '{}');
    return loginUser.email === email ? loginUser : undefined;
  }
}
