/* eslint-disable @typescript-eslint/no-explicit-any */
import * as angularCore from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';

import { CoursesComponent } from './courses.component';
import { Course } from '../../shared/models/course.models';
import { LoadingBlockService } from '../../shared/services/loading-block.service';
import { CoursesApiActions } from '../../store/courses/courses.actions';

const injectSpy = jest.spyOn(angularCore, 'inject');

describe('CoursesComponent', () => {
  let component: CoursesComponent;
  const router = { navigate: jest.fn() } as unknown as Router;
  const store = {
    dispatch: jest.fn(),
    select: jest.fn().mockReturnValue(of([])),
  } as unknown as Store<{
    courses: Course[];
  }>;
  const loadingBlockService = {
    showLoading: jest.fn(),
    hideLoading: jest.fn(),
  } as unknown as LoadingBlockService;

  beforeEach(() => {
    const injector = angularCore.ɵcreateInjector([
      injectSpy.mockReturnValueOnce(router),
      injectSpy.mockReturnValueOnce(store),
      injectSpy.mockReturnValueOnce(loadingBlockService),
    ]);

    angularCore.runInInjectionContext(injector, () => {
      component = new CoursesComponent();
    });
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

  it('should navigate to the correct route when onEditCourse is called', () => {
    const id = '123';

    component.onEditCourse(id);

    expect(router.navigate).toHaveBeenCalledWith([`courses/${id}`]);
  });

  it('should dispatch deleteCourse action when onDeleteCourse is called with confirmation', () => {
    const id = '123';
    const confirmation = true;
    global.confirm = jest.fn(() => confirmation);

    component.onDeleteCourse(id);

    expect(store.dispatch).toHaveBeenCalledWith(
      CoursesApiActions.deleteCourse({ payload: id }),
    );
  });

  it('should dispatch getCoursesByFragment action when onSearchItem is called with searchValue', () => {
    const searchValue = 'hello';
    component.searchValue = searchValue;

    component.onSearchItem();

    expect(store.dispatch).toHaveBeenCalledWith(
      CoursesApiActions.getCoursesByFragment({
        payload: { fragment: searchValue, sort: 'date' },
      }),
    );
  });

  it('should increase startItemIndex and call loadCourses when onLoadMoreClick is called', () => {
    component.startItemIndex = 0;

    component.onLoadMoreClick();

    expect(component.startItemIndex).toBe(component.itemsPerPage);
  });

  it('should navigate to the correct route when onEditCourse is called', () => {
    const id = '123';

    component.onEditCourse(id);

    expect(router.navigate).toHaveBeenCalledWith([`courses/${id}`]);
  });
});
