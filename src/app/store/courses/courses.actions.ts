import { createActionGroup, props } from '@ngrx/store';

import { Course } from '../../shared/models/course.models';

export const CoursesApiActions = createActionGroup({
  source: 'Courses API',
  events: {
    addCourse: props<{ payload: Course }>(),
    addCourseSuccess: props<{ payload: Course }>(),
    addCourseFailure: props<{ payload: Error }>(),
    deleteCourse: props<{ payload: Course['id'] }>(),
    deleteCourseSuccess: props<{ payload: Course['id'] }>(),
    deleteCourseFailure: props<{ payload: Error }>(),
    updateCourse: props<{ payload: Course }>(),
    updateCourseSuccess: props<{ payload: Course }>(),
    updateCourseFailure: props<{ payload: Error }>(),
    getCoursesByFragment: props<{
      payload: { fragment: string; sort: string };
    }>(),
    getCoursesByFragmentSuccess: props<{ payload: Course[] }>(),
    getCoursesByFragmentFailure: props<{ payload: Error }>(),
    getCourseById: props<{ payload: Course['id'] }>(),
    getCourseByIdSuccess: props<{ payload: Course }>(),
    getCourseByIdFailure: props<{ payload: Error }>(),
    getCourses: props<{
      payload: { startIndex: number; itemsPerPage: number; sort: string };
    }>(),
    getCoursesSuccess: props<{ payload: Course[] }>(),
    getCoursesFailure: props<{ payload: Error }>(),
  },
});
