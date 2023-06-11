import { Injectable, inject } from '@angular/core';

import { CourseFormStrategy, Strategy } from '../models/course-form.model';
import { Course } from '../models/course.models';
import { CreateCourseService } from './create-course.service';
import { EditCourseService } from './edit-course.service';

@Injectable()
export class StrategyFacade {
  private strategy: CourseFormStrategy | null = null;
  createCourseService = inject(CreateCourseService);
  editCourseService = inject(EditCourseService);

  registerStrategy(strategy: Strategy): void {
    this.strategy =
      strategy === Strategy.Create
        ? this.createCourseService
        : this.editCourseService;
  }

  submit(course: Course | undefined): void {
    if (this.strategy && course !== undefined) {
      this.strategy.submit(course);
    }
  }
}
