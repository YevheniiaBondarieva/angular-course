/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpRequest, HttpHandler, HttpHeaders } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor.service';
import { of } from 'rxjs';

describe('AuthInterceptor', () => {
  let interceptor: AuthInterceptor;
  let requestMock: HttpRequest<any>;
  let handlerMock: HttpHandler;

  beforeEach(() => {
    interceptor = new AuthInterceptor();
    requestMock = {
      clone: jest.fn().mockReturnValue({ headers: new HttpHeaders() }),
      headers: new HttpHeaders(),
      url: '/courses',
    } as unknown as HttpRequest<any>;
    handlerMock = { handle: jest.fn().mockReturnValue(of({})) } as HttpHandler;
  });

  it('should not modify request for "/auth/login" URL', () => {
    const loginRequestMock = {
      clone: jest.fn(),
      headers: new HttpHeaders(),
      url: '/auth/login',
    } as unknown as HttpRequest<any>;

    const result = interceptor.intercept(loginRequestMock, handlerMock);

    expect(result).toBe(handlerMock.handle(loginRequestMock));
  });

  it('should add "Authorization" header for non-login request', () => {
    const token = 'testToken';
    localStorage.setItem('token', token);
    const expectedHeaders = new HttpHeaders().append('Authorization', token);
    const expectedRequestMock = {
      clone: expect.any(Function),
      headers: expectedHeaders,
      url: '/courses',
    } as unknown as HttpRequest<any>;

    const result = interceptor.intercept(requestMock, handlerMock);

    expect(result).toBe(handlerMock.handle(expectedRequestMock));
  });

  it('should not add "Authorization" header for request without token in localStorage', () => {
    localStorage.removeItem('token');
    const expectedHeaders = new HttpHeaders();
    const expectedRequestMock = {
      clone: expect.any(Function),
      headers: expectedHeaders,
      url: '/courses',
    } as unknown as HttpRequest<any>;

    const result = interceptor.intercept(requestMock, handlerMock);

    expect(result).toBe(handlerMock.handle(expectedRequestMock));
  });
});
