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
      delete: jest.fn().mockReturnValue(of()),
    } as unknown as HttpClient;

    injectSpy.mockReturnValueOnce(http);
    service = new CoursesService();

    jest.spyOn(service.coursesChanged, 'emit');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return the list of courses', () => {
    let courses: Course[] = [];
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

    service.getCourses(0, 2).subscribe((coursesResult) => {
      courses = coursesResult;
    });

    expect(courses).toEqual(mockCourses);
  });

  it('should add a new course', () => {
    let courses: Course | undefined = undefined;
    const newCourse: Course = {
      id: 2,
      name: 'Course 2',
      description: 'Description 2',
      isTopRated: true,
      date: '2023-02-02',
      authors: [],
      length: 90,
    };

    service.createCourse(newCourse).subscribe((coursesResult) => {
      courses = coursesResult;
    });

    expect(courses).toEqual(newCourse);
  });

  it('should update a course item', () => {
    let course: Course | undefined = undefined;
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
      course = updated;
    });

    expect(course).toEqual(updatedCourse);
  });

  it('should remove a course item', () => {
    const courseId = 1;
    let result;

    service.removeCourseItem(courseId).subscribe((course) => {
      result = course;
    });

    expect(result).toBeUndefined();
  });
});
