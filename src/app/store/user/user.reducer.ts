import { createReducer, on } from '@ngrx/store';

import { User } from '../../shared/models/user.models';
import { UsersApiActions } from './user.actions';

export interface UserState extends User {
  error: string;
}

const initialState: UserState = {
  id: 0,
  token: localStorage.getItem('token') || '',
  name: {
    first: '',
    last: '',
  },
  login: '',
  password: '',
  error: '',
};

export const userReducer = createReducer(
  initialState,
  on(
    UsersApiActions.loginSuccess,
    (state): UserState => ({
      ...state,
      error: '',
    }),
  ),
  on(
    UsersApiActions.loginFailure,
    (state, action): UserState => ({
      ...state,
      error: action.payload.message,
    }),
  ),
  on(
    UsersApiActions.getCurrentUserSuccess,
    (state, action): UserState => ({
      ...state,
      id: action.payload.id,
      name: action.payload.name,
      login: action.payload.login,
      password: action.payload.password,
      error: '',
    }),
  ),
  on(
    UsersApiActions.getCurrentUserFailure,
    (state, action): UserState => ({
      ...state,
      error: action.payload.message,
    }),
  ),
  on(UsersApiActions.logout, (state): UserState => {
    return {
      ...state,
      id: 0,
      token: '',
      name: { first: '', last: '' },
      login: '',
      password: '',
      error: '',
    };
  }),
);
