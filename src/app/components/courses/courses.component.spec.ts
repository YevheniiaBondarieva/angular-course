import { CoursesComponent } from './courses.component';

describe('CoursesComponent', () => {
  let component: CoursesComponent;

  beforeEach(() => {
    component = new CoursesComponent();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call onLoadMoreClick method on Load More button click', () => {
    jest.spyOn(component, 'onLoadMoreClick');

    component.onLoadMoreClick();

    expect(component.onLoadMoreClick).toHaveBeenCalledTimes(1);
  });
});
