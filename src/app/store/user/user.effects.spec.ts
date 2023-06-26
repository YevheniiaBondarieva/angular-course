import { of } from 'rxjs';

import { AuthService } from '../../shared/services/auth.service';
import * as userEffects from './user.effects';
import { UsersApiActions } from './user.actions';
import { User } from '../../shared/models/user.models';
import { LoadingBlockService } from '../../shared/services/loading-block.service';

describe('effects', () => {
  it('authLogin should loads token successfully', (done) => {
    const email = 'test@example.com';
    const password = 'password';
    const token = 'token';
    const authServiceMock = {
      login: () => of(token),
    } as unknown as AuthService;
    const actionsMock$ = of(
      UsersApiActions.login({ payload: { email, password } }),
    );
    const loadingBlockService = {
      showLoading: jest.fn(),
      hideLoading: jest.fn(),
    } as unknown as LoadingBlockService;
    const spy = jest.spyOn(UsersApiActions, 'loginSuccess');

    userEffects
      .authLogin$(actionsMock$, authServiceMock, loadingBlockService)
      .subscribe(() => {
        expect(spy).toHaveBeenCalledTimes(1);
        done();
      });
  });

  it('logout should not dispatch another action', () => {
    const authServiceMock = {
      logout: () => of(),
    } as unknown as AuthService;
    const actionsMock$ = of(UsersApiActions.logout());
    const spy = jest.spyOn(UsersApiActions, 'logout');

    userEffects.logout$(actionsMock$, authServiceMock).subscribe(() => {
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  it('getUserInfo should loads user successfully', (done) => {
    const user: User = {
      id: 1,
      token: 'abc123',
      name: { first: 'John', last: 'Doe' },
      login: 'johndoe',
      password: 'password',
    };
    const authServiceMock = {
      getUserInfo: () => of(user),
    } as unknown as AuthService;
    const actionsMock$ = of(UsersApiActions.getCurrentUser());
    const loadingBlockService = {
      showLoading: jest.fn(),
      hideLoading: jest.fn(),
    } as unknown as LoadingBlockService;
    const spy = jest.spyOn(UsersApiActions, 'getCurrentUserSuccess');

    userEffects
      .getUserInfo$(actionsMock$, authServiceMock, loadingBlockService)
      .subscribe(() => {
        expect(spy).toHaveBeenCalledWith({ payload: user });
        done();
      });
  });
});
