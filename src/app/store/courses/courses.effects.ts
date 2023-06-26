import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, finalize, map, of, switchMap, tap } from 'rxjs';
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
      tap(() => loadingBlockService.showLoading()),
      switchMap((action) => coursesService.createCourse(action.payload)),
      map((course: Course) =>
        CoursesApiActions.addCourseSuccess({ payload: course }),
      ),
      tap(() => {
        router.navigate(['/courses']);
      }),
      catchError((error) =>
        of(CoursesApiActions.addCourseFailure({ payload: error })),
      ),
      tap(() => loadingBlockService.hideLoading()),
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
      tap(() => loadingBlockService.showLoading()),
      switchMap((action) =>
        coursesService.removeCourseItem(action.payload).pipe(
          map(() =>
            CoursesApiActions.deleteCourseSuccess({
              payload: action.payload,
            }),
          ),
          catchError((error) =>
            of(CoursesApiActions.deleteCourseFailure({ payload: error })),
          ),
          tap(() => loadingBlockService.hideLoading()),
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
      tap(() => loadingBlockService.showLoading()),
      switchMap((action) => coursesService.updateCourseItem(action.payload)),
      map((course: Course) =>
        CoursesApiActions.updateCourseSuccess({ payload: course }),
      ),
      tap(() => {
        router.navigate(['/courses']);
      }),
      catchError((error) =>
        of(CoursesApiActions.updateCourseFailure({ payload: error })),
      ),
      tap(() => loadingBlockService.hideLoading()),
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
      tap(() => loadingBlockService.showLoading()),
      switchMap((action) =>
        coursesService.getCourses(
          action.payload.startIndex,
          action.payload.itemsPerPage,
          action.payload.sort,
        ),
      ),
      map((courses) =>
        CoursesApiActions.getCoursesSuccess({ payload: courses }),
      ),
      catchError((error) =>
        of(CoursesApiActions.getCoursesFailure({ payload: error })),
      ),
      tap(() => loadingBlockService.hideLoading()),
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
      tap(() => loadingBlockService.showLoading()),
      switchMap((action) =>
        coursesService.getCoursesByFragment(
          action.payload.fragment,
          action.payload.sort,
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
      tap(() => loadingBlockService.hideLoading()),
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
      tap(() => loadingBlockService.showLoading()),
      switchMap((action) => coursesService.getCourseItemById(action.payload)),
      map((course) =>
        CoursesApiActions.getCourseByIdSuccess({ payload: course }),
      ),
      catchError((error) =>
        of(CoursesApiActions.getCourseByIdFailure({ payload: error })),
      ),
      tap(() => loadingBlockService.hideLoading()),
    );
  },
  { functional: true },
);
