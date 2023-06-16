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
    http = {
      get: jest.fn().mockReturnValue(of(null)),
      post: jest.fn().mockReturnValue(of(null)),
      patch: jest.fn().mockReturnValue(of(null)),
      delete: jest.fn().mockReturnValue(of(null)),
    } as unknown as HttpClient;

    injectSpy.mockReturnValueOnce(http);
    service = new CoursesService();

    jest.spyOn(service.coursesChanged, 'emit');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return the list of courses', () => {
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

    service.getCourses(0, 10).subscribe((courses) => {
      expect(courses).toEqual(mockCourses);
    });
  });

  it('should add a new course', () => {
    const newCourse: Course = {
      id: 3,
      name: 'New Course',
      description: 'New course description',
      isTopRated: false,
      date: '2023-09-30',
      authors: [],
      length: 120,
    };

    service.createCourse(newCourse).subscribe((createdCourse) => {
      expect(createdCourse).toEqual(newCourse);
    });
  });

  it('should return a course by ID', () => {
    const courseId = 2;
    const expectedCourse: Course = {
      id: 2,
      name: 'Course 2',
      description: 'Description 2',
      isTopRated: true,
      date: '2023-02-02',
      authors: [],
      length: 90,
    };

    service.getCourseItemById(courseId).subscribe((course) => {
      expect(course).toEqual(expectedCourse);
    });
  });

  it('should update a course item', () => {
    const updatedCourse: Course = {
      id: 2,
      name: 'Updated Course',
      description: 'Updated course description',
      isTopRated: true,
      date: '2023-05-23',
      authors: [],
      length: 200,
    };

    service.updateCourseItem(updatedCourse).subscribe((updated) => {
      expect(updated).toEqual(updatedCourse);
    });
  });

  it('should remove a course item', () => {
    const courseId = 1;

    service.removeCourseItem(courseId).subscribe((course) => {
      expect(course).toBeUndefined();
    });
  });
});
