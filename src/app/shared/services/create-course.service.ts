import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { CourseFormStrategy } from '../models/course-form.model';
import { CoursesService } from './courses.service';
import { Course } from '../models/course.models';

@Injectable()
export class CreateCourseService implements CourseFormStrategy {
  coursesService = inject(CoursesService);
  router = inject(Router);

  submit(course: Course): void {
    this.coursesService.createCourse(course).subscribe({
      next: () => {
        this.router.navigate(['/courses']);
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.message);
      },
    });
  }
}
