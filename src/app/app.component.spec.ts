import { RenderResult, render } from '@testing-library/angular';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import {
  LangChangeEvent,
  TranslateModule,
  TranslateService,
} from '@ngx-translate/core';
import { EventEmitter } from '@angular/core';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let fixture: RenderResult<AppComponent>;
  let component: AppComponent;
  const translateService = {
    use: jest.fn(),
    get: jest.fn().mockReturnValue(of()),
    onLangChange: new EventEmitter<LangChangeEvent>(),
    onTranslationChange: new EventEmitter(),
    onDefaultLangChange: new EventEmitter(),
  } as unknown as TranslateService;

  beforeEach(async () => {
    fixture = await render(AppComponent, {
      providers: [
        { provide: HttpClient, useValue: {} },
        { provide: Store, useValue: {} },
        { provide: TranslateService, useValue: translateService },
      ],
      imports: [TranslateModule],
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
