import { Course } from './course.models';

export interface CourseFormStrategy {
  submit(course: Course): void;
}

export const enum Strategy {
  Create = 'create',
  Edit = 'edit',
}
