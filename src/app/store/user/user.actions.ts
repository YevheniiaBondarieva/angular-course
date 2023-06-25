import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { User } from '../../shared/models/user.models';

export const UsersApiActions = createActionGroup({
  source: 'Users API',
  events: {
    login: props<{ payload: { email: string; password: string } }>(),
    loginSuccess: emptyProps(),
    loginFailure: emptyProps(),
    logout: emptyProps(),
    getCurrentUser: emptyProps(),
    getCurrentUserSuccess: props<{ payload: User }>(),
    getCurrentUserFailure: emptyProps(),
  },
});
