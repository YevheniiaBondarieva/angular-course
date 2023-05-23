import { courses } from '../../shared/data/courses.data';
import { CoursesPageComponent } from './courses-page.component';
import { RenderResult, render } from '@testing-library/angular';

describe('CoursesPageComponent', () => {
  let fixture: RenderResult<CoursesPageComponent>;
  let component: CoursesPageComponent;

  beforeEach(async () => {
    fixture = await render(CoursesPageComponent);
    component = fixture.fixture.componentInstance;
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

  it('should initialize coursesArray on ngOnInit', () => {
    const coursesPage = new CoursesPageComponent();
    expect(coursesPage.coursesArray).toEqual([]);
    coursesPage.ngOnInit();
    expect(coursesPage.coursesArray).toEqual(courses);
  });
});
