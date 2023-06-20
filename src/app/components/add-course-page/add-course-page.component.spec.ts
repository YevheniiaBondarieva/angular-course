import * as angularCore from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';

import AddCoursePageComponent from './add-course-page.component';
import { CoursesService } from '../../shared/services/courses.service';
import { StrategyFacade } from '../../shared/services/strategy-facade.service';

const injectSpy = jest.spyOn(angularCore, 'inject');

describe('AddCoursePageComponent', () => {
  let component: AddCoursePageComponent;
  const coursesService = {
    getCourses: jest.fn(),
    coursesChanged: { subscribe: jest.fn() },
    removeCourseItem: jest.fn(),
    updateCoureItem: jest.fn(),
    createCourse: jest.fn(),
    getCourseItemById: jest.fn(),
  };
  const router = { navigate: jest.fn() } as unknown as Router;
  const strategyFacade = {
    registerStrategy: jest.fn(),
    submit: jest.fn(),
  } as unknown as StrategyFacade;
  const destroyRef = {
    onDestroy: jest.fn(),
  } as unknown as angularCore.DestroyRef;

  beforeEach(() => {
    injectSpy.mockReturnValueOnce(coursesService as unknown as CoursesService);
    injectSpy.mockReturnValueOnce(router);
    injectSpy.mockReturnValueOnce(strategyFacade);
    injectSpy.mockReturnValueOnce(destroyRef);
    component = new AddCoursePageComponent();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update course duration', () => {
    const duration = 120;

    component.onDurationChange(duration);

    expect(component.courseDuration).toEqual(duration);
  });

  it('should update course date', () => {
    const date = '2023-06-03';

    component.onDateChange(date);

    expect(component.courseDate).toEqual(date);
  });

  it('should update course authors', () => {
    const authors = [
      { id: 1, name: 'Author 1', lastName: 'LastName 1' },
      { id: 2, name: 'Author 2', lastName: 'LastName 2' },
    ];

    component.onAuthorsChange(authors);

    expect(component.courseAuthors).toEqual(authors);
  });

  it('should navigate to courses on cancel', () => {
    const navigateSpy = jest.spyOn(component.router, 'navigate');

    component.onCancel();

    expect(navigateSpy).toHaveBeenCalledWith(['/courses']);
  });

  it('should initialize properties in edit mode', () => {
    const courseId = '123';
    const course = {
      id: courseId,
      name: 'Test',
      description: 'Test',
      isTopRated: true,
      date: '08/06/2023',
      authors: [],
      length: 156,
    };

    jest
      .spyOn(component.coursesService, 'getCourseItemById')
      .mockReturnValue(of(course));

    component.id = courseId;
    component.ngOnInit();

    expect(component.IsExist).toBe(true);
  });

  it('should initialize properties in create mode', () => {
    component.ngOnInit();

    expect(component.course).toBeUndefined();
  });

  it('should call strategyFacade.submit when onSave is called', () => {
    const submitSpy = jest.spyOn(component.strategyFacade, 'submit');

    component.onSave();

    expect(submitSpy).toHaveBeenCalledTimes(1);
  });
});
