import * as angularCore from '@angular/core';
import { Router } from '@angular/router';

import { EditCourseService } from './edit-course.service';
import { CoursesService } from './courses.service';
import { Course } from '../models/course.models';

const injectSpy = jest.spyOn(angularCore, 'inject');

describe('EditCourseService', () => {
  let editCourseService: EditCourseService;
  let coursesService: CoursesService;
  let router: Router;

  beforeEach(() => {
    coursesService = {
      updateCourseItem: jest.fn(),
    } as unknown as CoursesService;
    router = {
      navigate: jest.fn(),
    } as unknown as Router;

    injectSpy.mockReturnValueOnce(coursesService);
    injectSpy.mockReturnValueOnce(router);
    editCourseService = new EditCourseService();
  });

  it('should call updateCourseItem when submit is called', () => {
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

    expect(coursesService.updateCourseItem).toHaveBeenCalledWith(course);
  });

  it('should navigate when submit is called', () => {
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

    expect(router.navigate).toHaveBeenCalledWith(['/courses']);
  });
});
