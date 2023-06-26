import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  catchError,
  exhaustMap,
  finalize,
  map,
  of,
  switchMap,
  tap,
} from 'rxjs';

import { UsersApiActions } from './user.actions';
import { AuthService } from '../../shared/services/auth.service';
import { LoadingBlockService } from '../../shared/services/loading-block.service';

export const authLogin$ = createEffect(
  (
    actions$ = inject(Actions),
    authService = inject(AuthService),
    loadingBlockService = inject(LoadingBlockService),
  ) => {
    return actions$.pipe(
      ofType(UsersApiActions.login),
      tap(() => loadingBlockService.showLoading()),
      exhaustMap((action) =>
        authService.login(action.payload.email, action.payload.password),
      ),
      map(() => UsersApiActions.loginSuccess()),
      catchError((error: Error) =>
        of(UsersApiActions.loginFailure({ payload: error })),
      ),
      finalize(() => loadingBlockService.hideLoading()),
    );
  },
  { functional: true },
);

export const logout$ = createEffect(
  (actions$ = inject(Actions), authService = inject(AuthService)) => {
    return actions$.pipe(
      ofType(UsersApiActions.logout),
      tap(() => authService.logout()),
    );
  },
  { dispatch: false, functional: true },
);

export const getUserInfo$ = createEffect(
  (
    actions$ = inject(Actions),
    authService = inject(AuthService),
    loadingBlockService = inject(LoadingBlockService),
  ) => {
    return actions$.pipe(
      ofType(UsersApiActions.getCurrentUser),
      tap(() => loadingBlockService.showLoading()),
      switchMap(() => authService.getUserInfo()),
      map((user) => UsersApiActions.getCurrentUserSuccess({ payload: user })),
      catchError((error: Error) =>
        of(UsersApiActions.getCurrentUserFailure({ payload: error })),
      ),
      finalize(() => loadingBlockService.hideLoading()),
    );
  },
  { functional: true },
);
