import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

import { CourseFormStrategy } from '../models/course-form.model';
import { CoursesService } from './courses.service';
import { Course } from '../models/course.models';

@Injectable()
export class EditCourseService implements CourseFormStrategy {
  coursesService = inject(CoursesService);
  router = inject(Router);

  submit(course: Course): void {
    this.coursesService
      .updateCourseItem(course)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.log(error.message);
          return throwError(() => error);
        }),
      )
      .subscribe(() => {
        this.router.navigate(['/courses']);
      });
  }
}
