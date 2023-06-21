import * as angularCore from '@angular/core';
import { Store } from '@ngrx/store';

import { EditCourseService } from './edit-course.service';
import { Course } from '../models/course.models';
import { CoursesApiActions } from '../../store/courses/courses.actions';

const injectSpy = jest.spyOn(angularCore, 'inject');

describe('EditCourseService', () => {
  let editCourseService: EditCourseService;
  let store: Store;

  beforeEach(() => {
    store = { dispatch: jest.fn() } as unknown as Store<{ courses: Course[] }>;
    injectSpy.mockReturnValueOnce(store);
    editCourseService = new EditCourseService();
  });
  it('should dispatch updateCourse action with the correct payload', () => {
    const course: Course = {
      id: 1,
      name: 'Course 1',
      description: 'Course 1',
      isTopRated: false,
      date: '22/01/2023',
      authors: [],
      length: 0,
    };

    editCourseService.submit(course);

    expect(store.dispatch).toHaveBeenCalledWith(
      CoursesApiActions.updateCourse({ payload: course }),
    );
  });
});
