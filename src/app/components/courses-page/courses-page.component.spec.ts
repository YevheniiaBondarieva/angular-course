import { CoursesPageComponent } from './courses-page.component';

describe('CoursesPageComponent', () => {
  let component: CoursesPageComponent;

  beforeEach(() => {
    component = new CoursesPageComponent();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update searchValue correctly', () => {
    const searchValue = 'hello';

    component.onSearchItem(searchValue);

    expect(component.searchValue).toBe(searchValue);
  });
});
