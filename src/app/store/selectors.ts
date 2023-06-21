import { createSelector } from '@ngrx/store';

import { Course } from '../shared/models/course.models';
import { User } from '../shared/models/user.models';

export const selectUserName = (state: { user: User }) => state?.user?.name;

export const selectCourses = (state: { courses: Course[] }) => state.courses;

export const selectCourseById = (id: number) =>
  createSelector(selectCourses, (courses: Course[]) =>
    courses.find((course) => course.id === id),
  );
