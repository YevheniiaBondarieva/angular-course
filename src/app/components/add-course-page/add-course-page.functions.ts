/* eslint-disable @typescript-eslint/no-namespace */
import { FormArray, FormControl, FormGroup } from '@angular/forms';

import { Course } from '../../shared/models/course.models';
import { Author } from '../../shared/models/author.models';
import { AddCourseForm } from '../../shared/models/course-form.model';

export namespace AddCourseFunctions {
  export function fillFormFields(
    form: FormGroup<AddCourseForm>,
    course: Course | undefined,
  ): void {
    if (course !== undefined) {
      form.patchValue({
        id: course.id,
        name: course.name,
        description: course.description,
        isTopRated: course.isTopRated,
        date: course.date,
        length: course.length,
      });
      const authorsFormArray = form.get('authors') as FormArray<
        FormControl<Author>
      >;
      authorsFormArray.clear();
      const authorsControls = addAuthorsToFormArray(course.authors);
      authorsControls.forEach((control) => authorsFormArray.push(control));
    }
  }

  export function addAuthorsToFormArray(
    authors: Author[],
  ): FormControl<Author>[] {
    return authors.map((author) => {
      return new FormControl<Author>(
        {
          id: author.id,
          name: author.name,
          lastName: author.lastName,
        } as Author,
        { nonNullable: true },
      );
    });
  }

  export function convertDateFormat(inputDate: string) {
    const parts = inputDate.split('/');
    const day = parts[0];
    const month = parts[1];
    const year = parts[2];
    const date = new Date(`${year}-${month}-${day}`);
    const formattedDate = date.toISOString();

    return formattedDate;
  }
}
