import { FooterComponent } from './footer.component';
import { RenderResult, render } from '@testing-library/angular';

describe('FooterComponent', () => {
  let fixture: RenderResult<FooterComponent>;
  let component: FooterComponent;

  beforeEach(async () => {
    fixture = await render(FooterComponent);
    component = fixture.fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('should render', () => {
    let footer: HTMLElement | null;

    beforeEach(async () => {
      footer = fixture.container.querySelector('.footer');
    });

    it('with text: "Copyright © Videocourses. All rights reserved"', () => {
      expect(footer?.textContent).toMatch(
        /Copyright © Videocourses. All rights reserved/,
      );
    });
  });
});
