import { RenderResult, render } from '@testing-library/angular';
import { Router } from '@angular/router';

import LoginComponent from './login.component';
import { AuthService } from '../../shared/services/auth.service';

describe('LoginComponent', () => {
  let fixture: RenderResult<LoginComponent>;
  let component: LoginComponent;
  let authService: jest.Mocked<AuthService>;
  let router: Router;

  beforeEach(async () => {
    authService = {
      login: jest.fn(),
      isAuthenticated: jest.fn(),
    } as unknown as jest.Mocked<AuthService>;
    router = { navigate: jest.fn() } as unknown as jest.Mocked<Router>;
    fixture = await render(LoginComponent, {
      providers: [
        { provide: AuthService, useValue: authService },
        { provide: Router, useValue: router },
      ],
    });
    component = fixture.fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call authService.login() when onLogin is called with valid email and password', () => {
    component.email = 'test@example.com';
    component.password = 'password';

    component.onLogin();

    expect(authService.login).toHaveBeenCalledWith(
      'test@example.com',
      'password',
    );
  });

  it('should not call authService.login() when onLogin is called with empty email and password', () => {
    component.email = '';
    component.password = '';

    component.onLogin();

    expect(authService.login).not.toHaveBeenCalled();
  });
});
