import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';

import { CourseFormStrategy } from '../models/course-form.model';
import { CoursesService } from './courses.service';
import { Course } from '../models/course.models';

@Injectable()
export class CreateCourseService implements CourseFormStrategy {
  coursesService = inject(CoursesService);
  router = inject(Router);

  submit(course: Course): void {
    this.coursesService.createCourse(course);
    this.router.navigate(['/courses']);
  }
}
