import * as angularCore from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

import { CoursesService } from './courses.service';
import { Course } from '../models/course.models';

const injectSpy = jest.spyOn(angularCore, 'inject');

describe('CoursesService', () => {
  let service: CoursesService;
  let http: HttpClient;

  beforeEach(() => {
    const mockCoursesArray: Course[] = [
      {
        id: 1,
        name: 'Course 1',
        description: 'Description 1',
        isTopRated: false,
        date: '2023-01-01',
        authors: [],
        length: 60,
      },
      {
        id: 2,
        name: 'Course 2',
        description: 'Description 2',
        isTopRated: true,
        date: '2023-02-02',
        authors: [],
        length: 90,
      },
    ];
    const updatedCourse: Course = {
      id: 2,
      name: 'Updated Course',
      description: 'Updated course description',
      isTopRated: true,
      date: '2023-05-23',
      authors: [],
      length: 200,
    };
    http = {
      get: jest.fn().mockReturnValue(of(mockCoursesArray)),
      post: jest.fn().mockReturnValue(of(mockCoursesArray[1])),
      patch: jest.fn().mockReturnValue(of(updatedCourse)),
      delete: jest.fn().mockReturnValue(of(undefined)),
    } as unknown as HttpClient;

    injectSpy.mockReturnValueOnce(http);
    service = new CoursesService();

    jest.spyOn(service.coursesChanged, 'emit');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return the list of courses', (done) => {
    const mockCourses: Course[] = [
      {
        id: 1,
        name: 'Course 1',
        description: 'Description 1',
        isTopRated: false,
        date: '2023-01-01',
        authors: [],
        length: 60,
      },
      {
        id: 2,
        name: 'Course 2',
        description: 'Description 2',
        isTopRated: true,
        date: '2023-02-02',
        authors: [],
        length: 90,
      },
    ];
    jest.spyOn(service, 'getCourses');

    service.getCourses(0, 2).subscribe((coursesResult) => {
      expect(coursesResult).toEqual(mockCourses);
      done();
    });
  });

  it('should add a new course', (done) => {
    const newCourse: Course = {
      id: 2,
      name: 'Course 2',
      description: 'Description 2',
      isTopRated: true,
      date: '2023-02-02',
      authors: [],
      length: 90,
    };
    jest.spyOn(service, 'createCourse');

    service.createCourse(newCourse).subscribe((coursesResult) => {
      expect(coursesResult).toEqual(newCourse);
      done();
    });
  });

  it('should update a course item', (done) => {
    const updatedCourse: Course = {
      id: 2,
      name: 'Updated Course',
      description: 'Updated course description',
      isTopRated: true,
      date: '2023-05-23',
      authors: [],
      length: 200,
    };
    jest.spyOn(service, 'updateCourseItem');

    service.updateCourseItem(updatedCourse).subscribe((updated) => {
      expect(updated).toEqual(updatedCourse);
      done();
    });
  });

  it('should remove a course item', (done) => {
    const courseId = 1;
    jest.spyOn(service, 'removeCourseItem');

    service.removeCourseItem(courseId).subscribe((course) => {
      expect(course).toBeUndefined();
      done();
    });
  });
});
