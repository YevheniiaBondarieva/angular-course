import { createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';

import { Course } from '../../shared/models/course.models';
import { CoursesApiActions } from './courses.actions';

const adapter: EntityAdapter<Course> = createEntityAdapter<Course>({
  sortComparer: (a, b) =>
    new Date(b.date).getTime() - new Date(a.date).getTime(),
});

const initialState = adapter.getInitialState();

export const coursesReducer = createReducer(
  initialState,
  on(CoursesApiActions.addCourseSuccess, (state, action) =>
    adapter.addOne(action.payload, state),
  ),
  on(CoursesApiActions.getCourseByIdSuccess, (state, action) =>
    adapter.upsertOne(action.payload, state),
  ),
  on(CoursesApiActions.getCoursesSuccess, (state, action) =>
    adapter.upsertMany(action.payload, state),
  ),
  on(CoursesApiActions.getCoursesByFragmentSuccess, (state, action) =>
    adapter.setAll(action.payload, state),
  ),
  on(CoursesApiActions.updateCourseSuccess, (state, action) =>
    adapter.updateOne(
      { id: Number(action.payload.id), changes: action.payload },
      state,
    ),
  ),
  on(CoursesApiActions.deleteCourseSuccess, (state, action) =>
    adapter.removeOne(Number(action.payload), state),
  ),
  on(CoursesApiActions.addCourseFailure, (state, action) => state),
  on(CoursesApiActions.getCourseByIdFailure, (state, action) => state),
  on(CoursesApiActions.getCoursesFailure, (state, action) => state),
  on(CoursesApiActions.getCoursesByFragmentFailure, (state, action) => state),
  on(CoursesApiActions.updateCourseFailure, (state, action) => state),
  on(CoursesApiActions.deleteCourseFailure, (state, action) => state),
);
