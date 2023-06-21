import { of } from 'rxjs';

import { AuthService } from '../../shared/services/auth.service';
import * as userEffects from './user.effects';
import { UsersApiActions } from './user.actions';
import { User } from '../../shared/models/user.models';

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

    userEffects.authLogin(actionsMock$, authServiceMock).subscribe((action) => {
      expect(action).toEqual(
        UsersApiActions.loginSuccess({ payload: { token } }),
      );
      done();
    });
  });

  it('logout should not dispatch another action', (done) => {
    const authServiceMock = {
      logout: () => of(),
    } as unknown as AuthService;
    const actionsMock$ = of(UsersApiActions.logout());

    userEffects.logout(actionsMock$, authServiceMock).subscribe((action) => {
      expect(action).toEqual(UsersApiActions.logout());
      done();
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

    userEffects
      .getUserInfo(actionsMock$, authServiceMock)
      .subscribe((action) => {
        expect(action).toEqual(
          UsersApiActions.getCurrentUserSuccess({ payload: user }),
        );
        done();
      });
  });
});
