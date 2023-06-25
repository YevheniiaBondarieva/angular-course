/* eslint-disable @typescript-eslint/no-namespace */
import { createSelector } from '@ngrx/store';
import { EntityState, createEntityAdapter } from '@ngrx/entity';

import { Course } from '../shared/models/course.models';
import { User } from '../shared/models/user.models';

export namespace UserSelectors {
  export const selectUserName = createSelector(
    (state: { user: User }) => state?.user?.name,
    (name) => name,
  );
}

export namespace CourseSelectors {
  const adapter = createEntityAdapter<Course>();
  const { selectAll } = adapter.getSelectors();

  export const selectCourses = createSelector(
    (state: { courses: EntityState<Course> }) => state.courses,
    selectAll,
  );

  export const selectCourseById = (id: number) =>
    createSelector(selectCourses, (courses: Course[]) =>
      courses.find((course) => course.id === id),
    );
}
