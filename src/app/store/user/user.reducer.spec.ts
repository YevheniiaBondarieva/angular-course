import { userReducer } from './user.reducer';
import { UsersApiActions } from './user.actions';
import { User } from '../../shared/models/user.models';

describe('userReducer', () => {
  const initialState = {
    id: 0,
    token: '',
    name: {
      first: '',
      last: '',
    },
    login: '',
    password: '',
    error: '',
  };

  it('should update token on login success', () => {
    const action = UsersApiActions.loginSuccess();
    const state = userReducer(initialState, action);

    expect(state).toEqual(initialState);
  });

  it('should reset login on login failure', () => {
    const expectedState = { ...initialState, error: 'Failed to login' };
    const error = new Error('Failed to login');
    const action = UsersApiActions.loginFailure({ payload: error });
    const state = userReducer(initialState, action);

    expect(state).toEqual(expectedState);
  });

  it('should update user information on get current user success', () => {
    const user: User = {
      id: 1,
      token: 'abc123',
      name: { first: 'John', last: 'Doe' },
      login: 'johndoe',
      password: 'password',
    };
    const action = UsersApiActions.getCurrentUserSuccess({ payload: user });
    const state = userReducer(initialState, action);

    expect(state).toEqual({ ...user, token: '', error: '' });
  });

  it('should reset state on logout', () => {
    const action = UsersApiActions.logout();
    const state = userReducer(initialState, action);

    expect(state).toEqual(initialState);
  });

  it('should reset first and last name on get current user failure', () => {
    const expectedState = { ...initialState, error: 'Failed to get user info' };
    const error = new Error('Failed to get user info');
    const action = UsersApiActions.getCurrentUserFailure({ payload: error });
    const state = userReducer(initialState, action);

    expect(state).toEqual(expectedState);
  });
});
