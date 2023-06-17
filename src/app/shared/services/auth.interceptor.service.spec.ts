/* eslint-disable @typescript-eslint/no-explicit-any */
import { of } from 'rxjs';
import { HttpRequest, HttpHandler, HttpHeaders } from '@angular/common/http';

import { AuthInterceptor } from './auth.interceptor.service';

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

    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn(),
        setItem: jest.fn(),
        removeItem: jest.fn(),
      },
    });
  });

  it('should not modify request for "/auth/login" URL', () => {
    requestMock = new HttpRequest<any>('GET', '/auth/login');

    interceptor.intercept(requestMock, handlerMock).subscribe();

    expect(handlerMock.handle).toHaveBeenCalledWith(requestMock);
  });
  it('should add "Authorization" header for non-login request', () => {
    Object.defineProperty(window.localStorage, 'getItem', {
      value: jest.fn().mockReturnValue('example-token'),
    });

    interceptor.intercept(requestMock, handlerMock).subscribe();
    const expectedHeaders = requestMock.headers.append(
      'Authorization',
      'example-token',
    );

    expect(requestMock.clone).toHaveBeenCalledWith({
      headers: expectedHeaders,
    });
  });

  it('should add empty "Authorization" header for request without token in localStorage', () => {
    Object.defineProperty(window.localStorage, 'getItem', {
      value: jest.fn().mockReturnValue(null),
    });

    interceptor.intercept(requestMock, handlerMock).subscribe();
    const expectedHeaders = requestMock.headers.append('Authorization', '');

    expect(requestMock.clone).toHaveBeenCalledWith({
      headers: expectedHeaders,
    });
  });
});
