import { AppComponent } from './app.component';
import { RenderResult, render } from '@testing-library/angular';

describe('AppComponent', () => {
  let fixture: RenderResult<AppComponent>;
  let component: AppComponent;

  beforeEach(async () => {
    fixture = await render(AppComponent);
    component = fixture.fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  describe('should render', () => {
    it('the CoursesPageComponent', () => {
      const coursesPageComponent =
        fixture.container.querySelector('app-courses-page');

      expect(coursesPageComponent).toBeTruthy();
    });
    it('the FooterComponent', () => {
      const footerComponent = fixture.container.querySelector('app-footer');

      expect(footerComponent).toBeTruthy();
    });
  });
});
