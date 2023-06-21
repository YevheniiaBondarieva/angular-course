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
  };

  it('should update token on login success', () => {
    const action = UsersApiActions.loginSuccess({
      payload: { token: 'abc123' },
    });
    const state = userReducer(initialState, action);

    expect(state.token).toEqual('abc123');
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

    expect(state).toEqual({ ...user, token: '' });
  });

  it('should reset state on logout', () => {
    const action = UsersApiActions.logout();
    const state = userReducer(initialState, action);

    expect(state).toEqual(initialState);
  });
});
