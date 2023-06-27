import * as angularCore from '@angular/core';
import { Store } from '@ngrx/store';

import { CreateCourseService } from './create-course.service';
import { Course } from '../models/course.models';
import { CoursesApiActions } from '../../store/courses/courses.actions';

const injectSpy = jest.spyOn(angularCore, 'inject');

describe('CreateCourseService', () => {
  let createCourseService: CreateCourseService;
  let store: Store;

  beforeEach(() => {
    store = { dispatch: jest.fn() } as unknown as Store<{ courses: Course[] }>;
    injectSpy.mockReturnValueOnce(store);
    createCourseService = new CreateCourseService();
  });

  it('should dispatch addCourse action with the correct payload', () => {
    const course: Course = {
      id: 1,
      name: 'Course 1',
      description: 'Course 1',
      isTopRated: false,
      date: '22/01/2023',
      authors: [],
      length: 0,
    };

    createCourseService.submit(course);

    expect(store.dispatch).toHaveBeenCalledWith(
      CoursesApiActions.addCourse({ payload: course }),
    );
  });
});
