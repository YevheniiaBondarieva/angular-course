import * as angularCore from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';

import AddCoursePageComponent from './add-course-page.component';
import { StrategyFacade } from '../../shared/services/strategy-facade.service';
import { Course } from '../../shared/models/course.models';

const injectSpy = jest.spyOn(angularCore, 'inject');

describe('AddCoursePageComponent', () => {
  let component: AddCoursePageComponent;
  const router = { navigate: jest.fn() } as unknown as Router;
  const strategyFacade = {
    registerStrategy: jest.fn(),
    submit: jest.fn(),
  } as unknown as StrategyFacade;
  const store = {
    dispatch: jest.fn(),
    select: jest.fn().mockReturnValue(of([])),
  } as unknown as Store<{
    courses: Course[];
  }>;
  const destroyRef = {
    onDestroy: jest.fn(),
  } as unknown as angularCore.DestroyRef;
  const coursesService = {
    getAuthorsByFragment: jest.fn().mockReturnValue(of([])),
  };

  beforeEach(() => {
    injectSpy.mockReturnValueOnce(router);
    injectSpy.mockReturnValueOnce(strategyFacade);
    injectSpy.mockReturnValueOnce(store);
    injectSpy.mockReturnValueOnce(destroyRef);
    injectSpy.mockReturnValueOnce(coursesService);
    component = new AddCoursePageComponent();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to courses on cancel', () => {
    const navigateSpy = jest.spyOn(component.router, 'navigate');

    component.ngOnInit();
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
    jest.spyOn(store, 'select').mockReturnValueOnce(of(course));

    component.id = courseId;
    component.ngOnInit();

    expect(component.course).toEqual(course);
  });

  it('should initialize properties in create mode', () => {
    component.ngOnInit();

    expect(component.course).toBeUndefined();
  });

  it('should call strategyFacade.submit when onSave is called', () => {
    const submitSpy = jest.spyOn(component.strategyFacade, 'submit');

    component.ngOnInit();
    component.onSave();

    expect(submitSpy).toHaveBeenCalledTimes(1);
  });
});
