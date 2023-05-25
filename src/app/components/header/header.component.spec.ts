import { HeaderComponent } from './header.component';
import { RenderResult, render } from '@testing-library/angular';

describe('HeaderComponent', () => {
  let fixture: RenderResult<HeaderComponent>;
  let component: HeaderComponent;

  beforeEach(async () => {
    fixture = await render(HeaderComponent);
    component = fixture.fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('should render', () => {
    it('the CoursesPageComponent', () => {
      const LogoComponent = fixture.container.querySelector('app-logo');
      expect(LogoComponent).toBeTruthy();
    });
    it('placeholder with user login', () => {
      const link = fixture.container.querySelector('li.list-item a.link');
      expect(link?.textContent).toMatch(/User Login/);
    });
    it('log off button', () => {
      const button = fixture.container.querySelector(
        'li.list-item button.log-off',
      );
      expect(button).toBeTruthy();
    });
  });
});
