import { RenderResult, render } from '@testing-library/angular';

import { LoginComponent } from './login.component';
import { AuthService } from '../../shared/services/auth.service';

describe('LoginComponent', () => {
  let fixture: RenderResult<LoginComponent>;
  let component: LoginComponent;
  let authService: AuthService;

  beforeEach(async () => {
    authService = {
      login: jest.fn(),
    } as unknown as AuthService;
    fixture = await render(LoginComponent, {
      providers: [{ provide: AuthService, useValue: authService }],
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
