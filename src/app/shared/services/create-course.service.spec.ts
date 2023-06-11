import * as angularCore from '@angular/core';
import { Router } from '@angular/router';

import { CreateCourseService } from './create-course.service';
import { CoursesService } from './courses.service';
import { Course } from '../models/course.models';

const injectSpy = jest.spyOn(angularCore, 'inject');

describe('CreateCourseService', () => {
  let createCourseService: CreateCourseService;
  let coursesService: CoursesService;
  let router: Router;

  beforeEach(() => {
    coursesService = {
      createCourse: jest.fn(),
    } as unknown as CoursesService;
    router = {
      navigate: jest.fn(),
    } as unknown as Router;

    injectSpy.mockReturnValueOnce(coursesService);
    injectSpy.mockReturnValueOnce(router);
    createCourseService = new CreateCourseService();
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

    createCourseService.submit(course);

    expect(coursesService.createCourse).toHaveBeenCalledWith(course);
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

    createCourseService.submit(course);

    expect(router.navigate).toHaveBeenCalledWith(['/courses']);
  });
});
