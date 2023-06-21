import { createReducer, on } from '@ngrx/store';

import { User } from '../../shared/models/user.models';
import { UsersApiActions } from './user.actions';

const initialState: User = {
  id: 0,
  token: localStorage.getItem('token') || '',
  name: {
    first: '',
    last: '',
  },
  login: '',
  password: '',
};

export const userReducer = createReducer(
  initialState,
  on(
    UsersApiActions.loginSuccess,
    (state, action): User => ({
      ...state,
      token: action.payload.token,
    }),
  ),
  on(
    UsersApiActions.getCurrentUserSuccess,
    (state, action): User => ({
      ...state,
      id: action.payload.id,
      name: action.payload.name,
      login: action.payload.login,
      password: action.payload.password,
    }),
  ),
  on(UsersApiActions.logout, (state): User => {
    return {
      ...state,
      id: 0,
      token: '',
      name: { first: '', last: '' },
      login: '',
      password: '',
    };
  }),
);
