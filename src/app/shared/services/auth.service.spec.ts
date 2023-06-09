import * as angularCore from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { of } from 'rxjs';

import { AuthService } from './auth.service';

const injectSpy = jest.spyOn(angularCore, 'inject');

describe('AuthService', () => {
  let service: AuthService;
  let localStorageMock: { [key: string]: string | null };

  beforeEach(() => {
    localStorageMock = {};
    const router = { navigate: jest.fn() } as unknown as Router;
    const http = {
      post: jest.fn().mockReturnValue(of(null)),
    } as unknown as HttpClient;

    injectSpy.mockReturnValueOnce(http);
    injectSpy.mockReturnValueOnce(router);
    service = new AuthService();
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: (key: string) => localStorageMock[key],
        setItem: (key: string, value: string) => {
          localStorageMock[key] = value;
        },
        removeItem: (key: string) => {
          delete localStorageMock[key];
        },
      },
      writable: true,
    });

    jest.spyOn(service.statusChanged, 'emit');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should emit true when login is called', (done) => {
    jest.spyOn(service.http, 'post').mockReturnValue(of({}));
    const statusChangedSpy = jest.spyOn(service.statusChanged, 'emit');

    service.login('test@example.com', 'password').subscribe(() => {
      expect(statusChangedSpy).toHaveBeenCalledWith(true);
      done();
    });
  });

  it('should emit false when logout is called', () => {
    const statusChangedSpy = jest.spyOn(service.statusChanged, 'emit');

    service.logout();

    expect(statusChangedSpy).toHaveBeenCalledWith(false);
  });

  it('should return true when isAuthenticated and token exists in localStorage', () => {
    localStorageMock['token'] = 'testToken';
    const isAuthenticated = service.isAuthenticated();

    expect(isAuthenticated).toBe(true);
  });

  it('should return false when isAuthenticated and token does not exist in localStorage', () => {
    const isAuthenticated = service.isAuthenticated();

    expect(isAuthenticated).toBe(false);
  });

  it('should return user info when getUserInfo is called with matching email', (done) => {
    const email = 'test@example.com';
    const password = 'password';
    localStorageMock['user'] = JSON.stringify({ email, password });
    const name = { name: { first: 'John', last: 'Doe' } };
    jest.spyOn(service.http, 'post').mockReturnValue(of(name));

    service.getUserInfo().subscribe((userInfo) => {
      expect(userInfo).toEqual(name);
      done();
    });
  });
});
