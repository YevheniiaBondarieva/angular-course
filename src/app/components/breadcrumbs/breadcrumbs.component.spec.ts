import { RenderResult, render } from '@testing-library/angular';

import { BreadcrumbsComponent } from './breadcrumbs.component';

describe('BreadcrumbsComponent', () => {
  let fixture: RenderResult<BreadcrumbsComponent>;
  let component: BreadcrumbsComponent;

  beforeEach(async () => {
    fixture = await render(BreadcrumbsComponent);
    component = fixture.fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('should render', () => {
    it('placeholder with static text "Courses"', () => {
      const link = fixture.container.querySelector('a.link');

      expect(link?.textContent).toBe('Courses');
    });
  });
});
