import { Injectable, inject } from '@angular/core';

import { CourseFormStrategy } from '../models/course-form.model';
import { Course } from '../models/course.models';
import { Store } from '@ngrx/store';
import { CoursesApiActions } from '../../store/courses/courses.actions';

@Injectable()
export class CreateCourseService implements CourseFormStrategy {
  private store = inject(Store<{ courses: Course[] }>);

  submit(course: Course): void {
    this.store.dispatch(CoursesApiActions.addCourse({ payload: course }));
  }
}
