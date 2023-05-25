import { RenderResult, render } from '@testing-library/angular';
import { CoursesEditItemComponent } from './courses-edit-item.component';

describe('CoursesEditItemComponent', () => {
  let fixture: RenderResult<CoursesEditItemComponent>;
  let component: CoursesEditItemComponent;

  beforeEach(async () => {
    fixture = await render(CoursesEditItemComponent);
    component = fixture.fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
