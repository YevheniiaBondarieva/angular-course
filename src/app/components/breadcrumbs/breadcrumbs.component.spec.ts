import * as angularCore from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { of, take } from 'rxjs';
import { Store } from '@ngrx/store';

import { BreadcrumbsComponent } from './breadcrumbs.component';
import { Course } from '../../shared/models/course.models';

const injectSpy = jest.spyOn(angularCore, 'inject');

describe('BreadcrumbsComponent', () => {
  let component: BreadcrumbsComponent;
  const router = {
    events: of(new NavigationEnd(0, '', '')),
  } as unknown as Router;
  const store = { select: jest.fn() } as unknown as Store<{
    courses: Course[];
  }>;

  beforeEach(() => {
    injectSpy.mockReturnValueOnce(router);
    injectSpy.mockReturnValueOnce(store);
    component = new BreadcrumbsComponent();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update course$ after selecting course', (done) => {
    const courseId = 123;
    const mockCourse: Course = {
      id: 123,
      name: 'Course 3',
      description: 'Description 3',
      isTopRated: false,
      date: '2023-03-03',
      authors: [],
      length: 120,
    };
    jest
      .spyOn(router.events, 'pipe')
      .mockReturnValue(of(new NavigationEnd(0, `/courses/${courseId}`, '')));
    jest.spyOn(store, 'select').mockReturnValue(of(mockCourse));

    component.ngOnInit();

    component.course$?.pipe(take(1)).subscribe((course) => {
      expect(course).toEqual(mockCourse);
      done();
    });
  });

  it('should set course$ to undefined if course is not found', (done) => {
    const courseId = 123;
    jest
      .spyOn(router.events, 'pipe')
      .mockReturnValue(of(new NavigationEnd(0, `/courses/${courseId}`, '')));
    jest.spyOn(store, 'select').mockReturnValue(of(undefined));

    component.ngOnInit();

    component.course$?.pipe(take(1)).subscribe((course) => {
      expect(course).toBeUndefined();
      done();
    });
  });

  it('should return null when courseId is not a valid number', (done) => {
    const courseId = 'invalid';
    const expectedCourse = null;
    jest
      .spyOn(router.events, 'pipe')
      .mockReturnValue(of(new NavigationEnd(0, `/courses/${courseId}`, '')));
    jest.spyOn(store, 'select').mockReturnValue(of(null));

    component.ngOnInit();

    component.course$?.pipe(take(1)).subscribe((course) => {
      expect(course).toEqual(expectedCourse);
      done();
    });
  });
});
