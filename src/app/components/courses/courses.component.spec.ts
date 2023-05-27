import { CoursesComponent } from './courses.component';

describe('CoursesComponent', () => {
  let component: CoursesComponent;

  beforeEach(() => {
    component = new CoursesComponent();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit deleteCouseItem event on course delete', () => {
    jest.spyOn(component.deleteCouseItem, 'emit');
    const courseId = 1;

    component.onCouseDelete(courseId);

    expect(component.deleteCouseItem.emit).toHaveBeenCalledWith(courseId);
  });

  it('should call onLoadMoreClick method on Load More button click', () => {
    jest.spyOn(component, 'onLoadMoreClick');

    component.onLoadMoreClick();

    expect(component.onLoadMoreClick).toHaveBeenCalledTimes(1);
  });
});
