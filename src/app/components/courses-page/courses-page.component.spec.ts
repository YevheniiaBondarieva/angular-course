import { courses } from '../../shared/data/courses.data';
import { CoursesPageComponent } from './courses-page.component';

describe('CoursesPageComponent', () => {
  let component: CoursesPageComponent;

  beforeEach(() => {
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
    expect(component.coursesArray).toEqual([]);
    component.ngOnInit();
    expect(component.coursesArray).toEqual(courses);
  });
});
