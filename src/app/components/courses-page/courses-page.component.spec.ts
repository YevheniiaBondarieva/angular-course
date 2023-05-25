import { OrderByPipe } from '../../shared/pipes/order-by/order-by.pipe';
import { courses } from '../../shared/data/courses.data';
import { CoursesPageComponent } from './courses-page.component';
import { FilterPipe } from '../../shared/pipes/filter/filter.pipe';

describe('CoursesPageComponent', () => {
  let component: CoursesPageComponent;
  let filter: FilterPipe;
  let orderBy: OrderByPipe;

  beforeEach(() => {
    orderBy = new OrderByPipe();
    filter = new FilterPipe();
    component = new CoursesPageComponent(orderBy, filter);
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
    component.onSearchItem(searchValue);
    expect(component.filteredCoursesArray).toEqual(
      filter.transform(component.coursesArray, searchValue),
    );
  });
});
