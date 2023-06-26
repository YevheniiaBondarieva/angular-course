import { createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import { Course } from '../../shared/models/course.models';
import { CoursesApiActions } from './courses.actions';

const adapter: EntityAdapter<Course> = createEntityAdapter<Course>({
  sortComparer: (a, b) =>
    new Date(b.date).getTime() - new Date(a.date).getTime(),
});

const initialState = adapter.getInitialState({
  error: '',
});

interface InitialState extends EntityState<Course> {
  error: string;
}

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
  on(
    CoursesApiActions.addCourseFailure,
    CoursesApiActions.getCourseByIdFailure,
    CoursesApiActions.getCoursesFailure,
    CoursesApiActions.getCoursesByFragmentFailure,
    CoursesApiActions.updateCourseFailure,
    CoursesApiActions.deleteCourseFailure,
    (state, action): InitialState => ({
      ...state,
      error: action.payload.message,
    }),
  ),
);
