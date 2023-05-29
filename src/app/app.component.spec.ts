import { RenderResult, render } from '@testing-library/angular';

import { AppComponent } from './app.component';

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
    it('the loginComponent by default', () => {
      const coursesPageComponent = fixture.container.querySelector('app-login');
      expect(coursesPageComponent).toBeTruthy();
    });
    it('shouldn`t render the AppCoursesPage component by default', () => {
      const coursesPageComponent =
        fixture.container.querySelector('app-courses-page');
      expect(coursesPageComponent).toBeFalsy();
    });
    it('the FooterComponent', () => {
      const footerComponent = fixture.container.querySelector('app-footer');

      expect(footerComponent).toBeTruthy();
    });
  });
});
