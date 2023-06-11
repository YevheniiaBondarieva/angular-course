import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';

import { CourseFormStrategy } from '../models/course-form.model';
import { CoursesService } from './courses.service';
import { Course } from '../models/course.models';

@Injectable()
export class EditCourseService implements CourseFormStrategy {
  coursesService = inject(CoursesService);
  router = inject(Router);

  submit(course: Course): void {
    this.coursesService.updateCourseItem(course);
    this.router.navigate(['/courses']);
  }
}
