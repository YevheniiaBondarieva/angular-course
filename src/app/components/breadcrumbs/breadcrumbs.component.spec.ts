import * as angularCore from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { of } from 'rxjs';

import { BreadcrumbsComponent } from './breadcrumbs.component';
import { CoursesService } from '../../shared/services/courses.service';

const injectSpy = jest.spyOn(angularCore, 'inject');

describe('BreadcrumbsComponent', () => {
  let component: BreadcrumbsComponent;
  const coursesService = {
    getCourses: jest.fn(),
    coursesChanged: { subscribe: jest.fn() },
    removeCourseItem: jest.fn(),
    updateCoureItem: jest.fn(),
    createCourse: jest.fn(),
    getCourseItemById: jest.fn(),
  };
  const router = {
    events: of(new NavigationEnd(0, '', '')),
  } as unknown as Router;

  beforeEach(() => {
    injectSpy.mockReturnValueOnce(coursesService as unknown as CoursesService);
    injectSpy.mockReturnValueOnce(router);
    component = new BreadcrumbsComponent();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set courseName when id is provided', () => {
    const courseName = 'Course Name';
    coursesService.getCourseItemById.mockReturnValue(of({ name: courseName }));

    component.ngOnInit();

    expect(component.courseName).toBe(courseName);
  });
});
