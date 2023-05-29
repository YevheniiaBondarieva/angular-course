import { courses } from '../../shared/data/courses.data';
import { CoursesPageComponent } from './courses-page.component';
import { FilterPipe } from '../../shared/pipes/filter/filter.pipe';
import { OrderByPipe } from '../../shared/pipes/order-by/order-by.pipe';
import * as angularCore from '@angular/core';

const injectSpy = jest.spyOn(angularCore, 'inject');

describe('CoursesPageComponent', () => {
  let component: CoursesPageComponent;
  const filter = { transform: jest.fn() } as FilterPipe;
  const orderBy = { transform: jest.fn(() => courses) } as OrderByPipe;

  beforeEach(() => {
    injectSpy.mockReturnValueOnce(orderBy).mockReturnValueOnce(filter);
    component = new CoursesPageComponent();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should log the deleted course id on onDeleteCourseItem', () => {
    jest.spyOn(console, 'log');
    const courseId = 2;

    component.onDeleteCourseItem(courseId);

    expect(console.log).toHaveBeenCalledWith(courseId);
  });

  it('should have a coursesArray property with a default value of an empty array', () => {
    expect(component.coursesArray).toEqual([]);
  });

  it('should initialize coursesArray on ngOnInit', () => {
    component.ngOnInit();

    expect(component.coursesArray).toEqual(courses);
  });

  it('should update searchValue on onSearchItem', () => {
    const searchValue = 'test';

    component.onSearchItem(searchValue);

    expect(component.searchValue).toEqual(searchValue);
  });

  it('should update filteredCoursesArray on onSearchItem', () => {
    const searchValue = 'test';
    const transformedCourses = filter.transform(
      component.coursesArray,
      searchValue,
    );

    component.onSearchItem(searchValue);

    expect(component.filteredCoursesArray).toEqual(transformedCourses);
  });
});
