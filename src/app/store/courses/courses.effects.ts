import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, tap } from 'rxjs';
import { Router } from '@angular/router';

import { CoursesApiActions } from './courses.actions';
import { Course } from '../../shared/models/course.models';
import { CoursesService } from '../../shared/services/courses.service';

export const addCourse = createEffect(
  (
    actions$ = inject(Actions),
    coursesService = inject(CoursesService),
    router = inject(Router),
  ) => {
    return actions$.pipe(
      ofType(CoursesApiActions.addCourse),
      switchMap((action) =>
        coursesService.createCourse(action.payload).pipe(
          map(() => CoursesApiActions.addCourseSuccess()),
          tap(() => {
            router.navigate(['/courses']);
          }),
        ),
      ),
    );
  },
  { functional: true },
);

export const deleteCourse = createEffect(
  (actions$ = inject(Actions), coursesService = inject(CoursesService)) => {
    return actions$.pipe(
      ofType(CoursesApiActions.deleteCourse),
      switchMap((action) =>
        coursesService.removeCourseItem(action.payload).pipe(
          map(() =>
            CoursesApiActions.deleteCourseSuccess({
              payload: action.payload,
            }),
          ),
        ),
      ),
    );
  },
  { functional: true },
);

export const updateCourse = createEffect(
  (
    actions$ = inject(Actions),
    coursesService = inject(CoursesService),
    router = inject(Router),
  ) => {
    return actions$.pipe(
      ofType(CoursesApiActions.updateCourse),
      switchMap((action) =>
        coursesService.updateCourseItem(action.payload).pipe(
          map((course: Course) =>
            CoursesApiActions.updateCourseSuccess({ payload: course }),
          ),
          tap(() => {
            router.navigate(['/courses']);
          }),
        ),
      ),
    );
  },
  { functional: true },
);

export const getCourses = createEffect(
  (actions$ = inject(Actions), coursesService = inject(CoursesService)) => {
    return actions$.pipe(
      ofType(CoursesApiActions.getCourses),
      switchMap((action) =>
        coursesService
          .getCourses(
            action.payload.startIndex,
            action.payload.itemsPerPage,
            action.payload.sort,
          )
          .pipe(
            map((courses) =>
              CoursesApiActions.getCoursesSuccess({ payload: courses }),
            ),
          ),
      ),
    );
  },
  { functional: true },
);

export const getCoursesByFragment = createEffect(
  (actions$ = inject(Actions), coursesService = inject(CoursesService)) => {
    return actions$.pipe(
      ofType(CoursesApiActions.getCoursesByFragment),
      switchMap((action) =>
        coursesService
          .getCoursesByFragment(action.payload.fragment, action.payload.sort)
          .pipe(
            map((courses) =>
              CoursesApiActions.getCoursesByFragmentSuccess({
                payload: courses,
              }),
            ),
          ),
      ),
    );
  },
  { functional: true },
);

export const getCourseById = createEffect(
  (actions$ = inject(Actions), coursesService = inject(CoursesService)) => {
    return actions$.pipe(
      ofType(CoursesApiActions.getCourseById),
      switchMap((action) =>
        coursesService
          .getCourseItemById(action.payload)
          .pipe(
            map((course) =>
              CoursesApiActions.getCourseByIdSuccess({ payload: course }),
            ),
          ),
      ),
    );
  },
  { functional: true },
);
