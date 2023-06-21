import { createReducer, on } from '@ngrx/store';

import { Course } from '../../shared/models/course.models';
import { CoursesApiActions } from './courses.actions';

const initialState: Course[] = [];

export const coursesReducer = createReducer(
  initialState,
  on(CoursesApiActions.addCourseSuccess, (state): Course[] => state),
  on(CoursesApiActions.getCourseByIdSuccess, (state, action): Course[] => [
    action.payload,
  ]),
  on(CoursesApiActions.getCoursesSuccess, (state, action): Course[] => [
    ...state,
    ...action.payload,
  ]),
  on(
    CoursesApiActions.getCoursesByFragmentSuccess,
    (state, action): Course[] => action.payload,
  ),
  on(CoursesApiActions.updateCourseSuccess, (state, action): Course[] => {
    return state.map((course) =>
      course.id === action.payload.id ? action.payload : course,
    ) as Course[];
  }),
  on(CoursesApiActions.deleteCourseSuccess, (state, action): Course[] =>
    state.filter((course) => course.id !== action.payload),
  ),
  on(CoursesApiActions.destroyCourses, (): Course[] => initialState),
);
