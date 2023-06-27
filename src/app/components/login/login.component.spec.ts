import { RenderResult, render } from '@testing-library/angular';
import { Store } from '@ngrx/store';

import LoginComponent from './login.component';
import { User } from '../../shared/models/user.models';
import { UsersApiActions } from '../../store/user/user.actions';

describe('LoginComponent', () => {
  let fixture: RenderResult<LoginComponent>;
  let component: LoginComponent;
  let store: Store;

  beforeEach(async () => {
    store = { dispatch: jest.fn() } as unknown as Store<{ user: User }>;
    fixture = await render(LoginComponent, {
      providers: [{ provide: Store, useValue: store }],
    });
    component = fixture.fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch login action with the correct payload on login', () => {
    const email = 'test@example.com';
    const password = 'password';
    component.email = 'test@example.com';
    component.password = 'password';
    const expectedAction = UsersApiActions.login({
      payload: { email, password },
    });

    component.onLogin();

    expect(store.dispatch).toHaveBeenCalledWith(expectedAction);
  });

  it('should not call dispatch login action when onLogin is called with empty email and password', () => {
    component.email = '';
    component.password = '';

    component.onLogin();

    expect(store.dispatch).not.toHaveBeenCalled();
  });
});
