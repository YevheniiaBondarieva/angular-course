import * as angularCore from '@angular/core';
import { Router } from '@angular/router';

import { authGuard } from './auth-guard.service';
import { AuthService } from './auth.service';

const injectSpy = jest.spyOn(angularCore, 'inject');

describe('AuthGuard', () => {
  let authService: jest.Mocked<AuthService>;
  let router: jest.Mocked<Router>;

  beforeEach(() => {
    authService = {
      getUserInfo: jest.fn(),
      login: jest.fn(),
      logout: jest.fn(),
      isAuthenticated: jest.fn(),
      statusChanged: { subscribe: jest.fn() },
    } as unknown as jest.Mocked<AuthService>;
    router = { navigate: jest.fn() } as unknown as jest.Mocked<Router>;

    injectSpy.mockReturnValueOnce(authService);
    injectSpy.mockReturnValueOnce(router);
  });

  it('should return true when user is authenticated', () => {
    authService.isAuthenticated.mockReturnValue(true);

    const result = authGuard();

    expect(result).toBe(true);
  });

  it('should return false and navigate to login when user is not authenticated', () => {
    authService.isAuthenticated.mockReturnValue(false);

    const result = authGuard();

    expect(result).toBe(false);
  });
});
