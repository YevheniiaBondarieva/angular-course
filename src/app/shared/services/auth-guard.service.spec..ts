import * as angularCore from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

import { AuthGuard } from './auth-guard.service';
import { AuthService } from './auth.service';

const injectSpy = jest.spyOn(angularCore, 'inject');

describe('AuthGuard', () => {
  let authGuard: AuthGuard;
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
    authGuard = new AuthGuard();
  });

  it('should create', () => {
    expect(authGuard).toBeTruthy();
  });

  it('should allow access when user is authenticated', () => {
    authService.isAuthenticated.mockReturnValue(true);

    const route = {} as ActivatedRouteSnapshot;
    const state = {} as RouterStateSnapshot;
    const canActivate = authGuard.canActivate(route, state);

    expect(canActivate).toBe(true);
  });

  it('should deny access and redirect to login when user is not authenticated', () => {
    authService.isAuthenticated.mockReturnValue(false);

    const route = {} as ActivatedRouteSnapshot;
    const state = {} as RouterStateSnapshot;
    const canActivate = authGuard.canActivate(route, state);

    expect(canActivate).toBe(false);
  });
});
