import { RenderResult, render } from '@testing-library/angular';
import { HttpClient } from '@angular/common/http';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let fixture: RenderResult<AppComponent>;
  let component: AppComponent;

  beforeEach(async () => {
    fixture = await render(AppComponent, {
      providers: [{ provide: HttpClient, useValue: {} }],
    });
    component = fixture.fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  describe('should render', () => {
    it('the FooterComponent', () => {
      const footerComponent = fixture.container.querySelector('app-footer');

      expect(footerComponent).toBeTruthy();
    });
  });
});
