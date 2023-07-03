/* eslint-disable @typescript-eslint/no-namespace */
import { createSelector } from '@ngrx/store';
import { EntityState, createEntityAdapter } from '@ngrx/entity';

import { Course } from '../shared/models/course.models';
import { User } from '../shared/models/user.models';
import { UserState } from './user/user.reducer';

export namespace UserSelectors {
  export const selectUserName = createSelector(
    (state: { user: User }) => state?.user?.name,
    (name) => name,
  );
  export const selectErrorMessage = (state: { user: UserState }) =>
    state.user.error;
}

export namespace CourseSelectors {
  const adapter = createEntityAdapter<Course>();
  const { selectAll, selectEntities } = adapter.getSelectors();

  export const selectCourses = createSelector(
    (state: { courses: EntityState<Course> }) => state.courses,
    selectAll,
  );

  export const selectCourseEntities = createSelector(
    (state: { courses: EntityState<Course> }) => state.courses,
    selectEntities,
  );

  export const selectCourseById = (id: number) =>
    createSelector(selectCourseEntities, (entities) => entities[id]);
}
