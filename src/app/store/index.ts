import { coursesReducer } from './courses/courses.reducer';
import { userReducer } from './user/user.reducer';
import * as authEffects from './user/user.effects';
import * as coursesEffects from './courses/courses.effects';

export const rootReducer = {
  courses: coursesReducer,
  user: userReducer,
};

export const rootEffect = [authEffects, coursesEffects];
