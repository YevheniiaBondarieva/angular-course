import * as angularCore from '@angular/core';

import { courses } from '../../shared/data/courses.data';
import { CoursesComponent } from './courses.component';
import { FilterPipe } from '../../shared/pipes/filter/filter.pipe';
import { OrderByPipe } from '../../shared/pipes/order-by/order-by.pipe';
import { CoursesService } from '../../shared/services/courses.service';

const injectSpy = jest.spyOn(angularCore, 'inject');

describe('CoursesComponent', () => {
  let component: CoursesComponent;
  const filter = {
    transform: jest.fn(),
  } as FilterPipe;
  const orderBy = {
    transform: jest.fn(() => coursesService.getCourses()),
  } as OrderByPipe;
  const coursesService = {
    getCourses: jest.fn(),
    coursesChanged: { subscribe: jest.fn() },
  };

  beforeEach(() => {
    injectSpy.mockReturnValueOnce(orderBy);
    injectSpy.mockReturnValueOnce(coursesService as unknown as CoursesService);
    injectSpy.mockReturnValueOnce(filter);
    coursesService.getCourses.mockReturnValue(courses);
    component = new CoursesComponent();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a coursesArray property with a default value of an empty array', () => {
    expect(component.coursesArray).toEqual([]);
  });

  it('should initialize coursesArray on ngOnInit', () => {
    component.ngOnInit();

    expect(component.coursesArray).toEqual(coursesService.getCourses());
  });

  it('should update filteredCoursesArray on onSearchItem', () => {
    const searchValue = 'hello';
    const transformedCourses = [
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
    filter.transform = jest.fn().mockReturnValue(transformedCourses);
    component.searchValue = searchValue;

    component.onSearchItem();

    expect(component.filteredCoursesArray).toEqual(transformedCourses);
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

    component.ngOnChanges();

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
});
