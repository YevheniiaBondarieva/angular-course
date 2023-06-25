import { User } from '../../shared/models/user.models';
import { UsersApiActions } from './user.actions';

describe('UsersApiActions', () => {
  it('should create login action', () => {
    const email = 'test@example.com';
    const password = 'password';
    const action = UsersApiActions.login({ payload: { email, password } });

    expect(action).toEqual({
      type: '[Users API] login',
      payload: { email, password },
    });
  });

  it('should create loginSuccess action', () => {
    const action = UsersApiActions.loginSuccess();

    expect(action).toEqual({
      type: '[Users API] loginSuccess',
    });
  });

  it('should create loginFailure action', () => {
    const action = UsersApiActions.loginFailure();

    expect(action).toEqual({ type: '[Users API] loginFailure' });
  });

  it('should create logout action', () => {
    const action = UsersApiActions.logout();

    expect(action).toEqual({ type: '[Users API] logout' });
  });

  it('should create getCurrentUser action', () => {
    const action = UsersApiActions.getCurrentUser();

    expect(action).toEqual({ type: '[Users API] getCurrentUser' });
  });

  it('should create getCurrentUserSuccess action', () => {
    const user: User = {
      id: 1,
      token: 'abc123',
      name: { first: 'John', last: 'Doe' },
      login: 'johndoe',
      password: 'password',
    };
    const action = UsersApiActions.getCurrentUserSuccess({ payload: user });

    expect(action).toEqual({
      type: '[Users API] getCurrentUserSuccess',
      payload: user,
    });
  });

  it('should create getCurrentUserFailure action', () => {
    const action = UsersApiActions.getCurrentUserFailure();

    expect(action).toEqual({ type: '[Users API] getCurrentUserFailure' });
  });
});
