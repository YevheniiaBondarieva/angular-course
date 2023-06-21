import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap, map, switchMap, tap } from 'rxjs';

import { UsersApiActions } from './user.actions';
import { AuthService } from '../../shared/services/auth.service';

export const authLogin = createEffect(
  (actions$ = inject(Actions), authService = inject(AuthService)) => {
    return actions$.pipe(
      ofType(UsersApiActions.login),
      exhaustMap((action) =>
        authService
          .login(action.payload.email, action.payload.password)
          .pipe(
            map((token: string) =>
              UsersApiActions.loginSuccess({ payload: { token } }),
            ),
          ),
      ),
    );
  },
  { functional: true },
);

export const logout = createEffect(
  (actions$ = inject(Actions), authService = inject(AuthService)) => {
    return actions$.pipe(
      ofType(UsersApiActions.logout),
      tap(() => authService.logout()),
    );
  },
  { dispatch: false, functional: true },
);

export const getUserInfo = createEffect(
  (actions$ = inject(Actions), authService = inject(AuthService)) => {
    return actions$.pipe(
      ofType(UsersApiActions.getCurrentUser),
      switchMap(() =>
        authService
          .getUserInfo()
          .pipe(
            map((user) =>
              UsersApiActions.getCurrentUserSuccess({ payload: user }),
            ),
          ),
      ),
    );
  },
  { functional: true },
);
