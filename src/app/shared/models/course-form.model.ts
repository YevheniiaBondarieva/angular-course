import { FormArray, FormControl } from '@angular/forms';

import { Course } from './course.models';
import { Author } from './author.models';

export interface CourseFormStrategy {
  submit(course: Course): void;
}

export const enum Strategy {
  Create = 'create',
  Edit = 'edit',
}

export interface AddCourseForm {
  id: FormControl<number | string>;
  name: FormControl<string>;
  description: FormControl<string>;
  isTopRated: FormControl<boolean>;
  date: FormControl<string>;
  authors: FormArray<FormControl<Author>>;
  length: FormControl<number>;
}
