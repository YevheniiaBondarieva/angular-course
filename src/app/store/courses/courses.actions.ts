import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { Course } from '../../shared/models/course.models';

export const CoursesApiActions = createActionGroup({
  source: 'Courses API',
  events: {
    addCourse: props<{ payload: Course }>(),
    addCourseSuccess: emptyProps(),
    deleteCourse: props<{ payload: Course['id'] }>(),
    deleteCourseSuccess: props<{ payload: Course['id'] }>(),
    updateCourse: props<{ payload: Course }>(),
    updateCourseSuccess: props<{ payload: Course }>(),
    getCoursesByFragment: props<{
      payload: { fragment: string; sort: string };
    }>(),
    getCoursesByFragmentSuccess: props<{ payload: Course[] }>(),
    getCourseById: props<{ payload: Course['id'] }>(),
    getCourseByIdSuccess: props<{ payload: Course }>(),
    getCourses: props<{
      payload: { startIndex: number; itemsPerPage: number; sort: string };
    }>(),
    getCoursesSuccess: props<{ payload: Course[] }>(),
    destroyCourses: emptyProps(),
  },
});
