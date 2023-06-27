import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { Router } from '@angular/router';

import { CoursesApiActions } from './courses.actions';
import { Course } from '../../shared/models/course.models';
import { CoursesService } from '../../shared/services/courses.service';
import { LoadingBlockService } from '../../shared/services/loading-block.service';

export const addCourse$ = createEffect(
  (
    actions$ = inject(Actions),
    coursesService = inject(CoursesService),
    router = inject(Router),
    loadingBlockService = inject(LoadingBlockService),
  ) => {
    return actions$.pipe(
      ofType(CoursesApiActions.addCourse),
      switchMap((action) =>
        loadingBlockService.wrapWithLoader(
          coursesService.createCourse(action.payload),
        ),
      ),
      map((course: Course) =>
        CoursesApiActions.addCourseSuccess({ payload: course }),
      ),
      tap(() => {
        router.navigate(['/courses']);
      }),
      catchError((error) =>
        of(CoursesApiActions.addCourseFailure({ payload: error })),
      ),
    );
  },
  { functional: true },
);

export const deleteCourse$ = createEffect(
  (
    actions$ = inject(Actions),
    coursesService = inject(CoursesService),
    loadingBlockService = inject(LoadingBlockService),
  ) => {
    return actions$.pipe(
      ofType(CoursesApiActions.deleteCourse),
      switchMap((action) =>
        loadingBlockService
          .wrapWithLoader(coursesService.removeCourseItem(action.payload))
          .pipe(
            map(() =>
              CoursesApiActions.deleteCourseSuccess({
                payload: action.payload,
              }),
            ),
            catchError((error) =>
              of(CoursesApiActions.deleteCourseFailure({ payload: error })),
            ),
          ),
      ),
    );
  },
  { functional: true },
);

export const updateCourse$ = createEffect(
  (
    actions$ = inject(Actions),
    coursesService = inject(CoursesService),
    router = inject(Router),
    loadingBlockService = inject(LoadingBlockService),
  ) => {
    return actions$.pipe(
      ofType(CoursesApiActions.updateCourse),
      switchMap((action) =>
        loadingBlockService.wrapWithLoader(
          coursesService.updateCourseItem(action.payload),
        ),
      ),
      map((course: Course) =>
        CoursesApiActions.updateCourseSuccess({ payload: course }),
      ),
      tap(() => {
        router.navigate(['/courses']);
      }),
      catchError((error) =>
        of(CoursesApiActions.updateCourseFailure({ payload: error })),
      ),
    );
  },
  { functional: true },
);

export const getCourses$ = createEffect(
  (
    actions$ = inject(Actions),
    coursesService = inject(CoursesService),
    loadingBlockService = inject(LoadingBlockService),
  ) => {
    return actions$.pipe(
      ofType(CoursesApiActions.getCourses),
      switchMap((action) =>
        loadingBlockService.wrapWithLoader(
          coursesService.getCourses(
            action.payload.startIndex,
            action.payload.itemsPerPage,
            action.payload.sort,
          ),
        ),
      ),
      map((courses) =>
        CoursesApiActions.getCoursesSuccess({ payload: courses }),
      ),
      catchError((error) =>
        of(CoursesApiActions.getCoursesFailure({ payload: error })),
      ),
    );
  },
  { functional: true },
);

export const getCoursesByFragment$ = createEffect(
  (
    actions$ = inject(Actions),
    coursesService = inject(CoursesService),
    loadingBlockService = inject(LoadingBlockService),
  ) => {
    return actions$.pipe(
      ofType(CoursesApiActions.getCoursesByFragment),
      switchMap((action) =>
        loadingBlockService.wrapWithLoader(
          coursesService.getCoursesByFragment(
            action.payload.fragment,
            action.payload.sort,
          ),
        ),
      ),
      map((courses) =>
        CoursesApiActions.getCoursesByFragmentSuccess({
          payload: courses,
        }),
      ),
      catchError((error) =>
        of(
          CoursesApiActions.getCoursesByFragmentFailure({
            payload: error,
          }),
        ),
      ),
    );
  },
  { functional: true },
);

export const getCourseById$ = createEffect(
  (
    actions$ = inject(Actions),
    coursesService = inject(CoursesService),
    loadingBlockService = inject(LoadingBlockService),
  ) => {
    return actions$.pipe(
      ofType(CoursesApiActions.getCourseById),
      switchMap((action) =>
        loadingBlockService.wrapWithLoader(
          coursesService.getCourseItemById(action.payload),
        ),
      ),
      map((course) =>
        CoursesApiActions.getCourseByIdSuccess({ payload: course }),
      ),
      catchError((error) =>
        of(CoursesApiActions.getCourseByIdFailure({ payload: error })),
      ),
    );
  },
  { functional: true },
);
