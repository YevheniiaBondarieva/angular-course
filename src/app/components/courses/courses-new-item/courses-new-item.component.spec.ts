import { RenderResult, render } from '@testing-library/angular';
import { CoursesNewItemComponent } from './courses-new-item.component';

describe(' CoursesNewItemComponent', () => {
  let fixture: RenderResult<CoursesNewItemComponent>;
  let component: CoursesNewItemComponent;

  beforeEach(async () => {
    fixture = await render(CoursesNewItemComponent);
    component = fixture.fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
