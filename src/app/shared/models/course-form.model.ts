import { Course } from './course.models';

export interface CourseFormStrategy {
  submit(course: Course): void;
}

export enum Strategy {
  Create = 'create',
  Edit = 'edit',
}
