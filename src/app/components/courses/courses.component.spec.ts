/* eslint-disable @typescript-eslint/no-explicit-any */
import * as angularCore from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { of, throwError } from 'rxjs';

import { courses } from '../../shared/data/courses.data';
import { CoursesComponent } from './courses.component';
import { CoursesService } from '../../shared/services/courses.service';
import { Course } from '../../shared/models/course.models';
import { LoadingBlockService } from '../../shared/services/loading-block.service';

const injectSpy = jest.spyOn(angularCore, 'inject');

describe('CoursesComponent', () => {
  let component: CoursesComponent;
  const coursesService = {
    getCourses: jest.fn(),
    coursesChanged: { subscribe: jest.fn() },
    getCoursesByFragment: jest.fn(),
    removeCourseItem: jest.fn().mockReturnValue(of(null)),
  };
  const router = { navigate: jest.fn() } as unknown as Router;
  const loadingBlockService = jest.fn() as unknown as LoadingBlockService;
  const route = {} as ActivatedRoute;

  beforeEach(() => {
    injectSpy.mockReturnValueOnce(coursesService as unknown as CoursesService);
    injectSpy.mockReturnValueOnce(router);
    injectSpy.mockReturnValueOnce(route);
    injectSpy.mockReturnValueOnce(loadingBlockService);
    coursesService.getCourses.mockReturnValue(of(courses));
    component = new CoursesComponent();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a coursesArray property with a default value of an empty array', () => {
    expect(component.coursesArray).toEqual([]);
  });

  it('should call loadCourses on ngOnInit', () => {
    jest.spyOn(component, 'loadCourses');

    component.ngOnInit();

    expect(component.loadCourses).toHaveBeenCalledTimes(1);
  });

  it('should update coursesArray on onSearchItem', () => {
    const mockCourses: Course[] = [
      {
        id: 3,
        name: 'Course 3',
        description: 'Description 3',
        isTopRated: false,
        date: '2023-03-03',
        authors: [],
        length: 120,
      },
    ];

    coursesService.getCoursesByFragment.mockReturnValue(of(mockCourses));

    component.searchValue = 'search query';
    component.onSearchItem();

    expect(component.coursesArray).toEqual(mockCourses);
  });

  it('should call onLoadMoreClick method on Load More button click', () => {
    jest.spyOn(component, 'onLoadMoreClick');

    component.onLoadMoreClick();

    expect(component.onLoadMoreClick).toHaveBeenCalledTimes(1);
  });

  it('should call onSearchItem method when searchValue changes', () => {
    const searchValue = 'hello';
    component.searchValue = searchValue;
    jest.spyOn(component, 'onSearchItem');

    component.ngOnChanges({
      searchValue: { currentValue: searchValue },
    } as unknown as angularCore.SimpleChanges);

    expect(component.onSearchItem).toHaveBeenCalledTimes(1);
  });

  it('should return course id in trackByCourseId function', () => {
    const index = 0;
    const course = {
      id: 3,
      name: 'Hello',
      description:
        'Learn about where you czn find course description, what information they include, how they work, and details about various components of a course description. Course descriptions report information about a university or college`s class.They`re published both in course catalog.',
      isTopRated: true,
      date: '2023-05-10',
      authors: [
        {
          id: '4',
          name: 'Kary',
          lastName: 'Kok',
        },
      ],
      length: 59,
    };
    const result = component.trackByCourseId(index, course);

    expect(result).toBe(course.id);
  });

  it('should set coursesArray to originalCoursesArray when searchValue is empty', () => {
    const initialCoursesArray = [
      {
        id: 3,
        name: 'Hello',
        description:
          'Learn about where you czn find course description, what information they include, how they work, and details about various components of a course description. Course descriptions report information about a university or college`s class.They`re published both in course catalog.',
        isTopRated: true,
        date: '2023-05-10',
        authors: [
          {
            id: '4',
            name: 'Kary',
            lastName: 'Kok',
          },
        ],
        length: 59,
      },
    ];
    component.coursesArray = initialCoursesArray;
    component.searchValue = '';

    component.onSearchItem();

    expect(component.coursesArray).toEqual(component.originalCoursesArray);
  });

  it('should call coursesService.removeCourseItem on onDeleteCourse confirmation', () => {
    const courseId = 2;
    jest.spyOn(window, 'confirm').mockReturnValue(true);

    component.onDeleteCourse(courseId);

    expect(coursesService.removeCourseItem).toHaveBeenCalledWith(courseId);
  });

  it('should load courses and update arrays', () => {
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
    coursesService.getCourses.mockReturnValue(of(mockCourses));

    component.loadCourses();

    expect(component.coursesArray).toEqual(mockCourses);
  });

  it('should handle error in loadCourses()', () => {
    const errorMessage = 'Error message';
    coursesService.getCourses.mockReturnValue(
      throwError({ message: errorMessage }),
    );
    jest.spyOn(console, 'log');

    component.loadCourses();

    expect(console.log).toHaveBeenCalledWith(errorMessage);
  });

  it('should navigate to the correct route when onEditCourse is called', () => {
    const id = '123';

    component.onEditCourse(id);

    expect(router.navigate).toHaveBeenCalledWith([`courses/${id}`]);
  });
});
