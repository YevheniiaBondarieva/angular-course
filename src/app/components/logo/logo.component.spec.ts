import { RenderResult, render } from '@testing-library/angular';
import { EventEmitter } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';

import { LogoComponent } from './logo.component';

describe('LogoComponent', () => {
  let fixture: RenderResult<LogoComponent>;
  let component: LogoComponent;
  const translateService = {
    use: jest.fn(),
    get: jest.fn().mockReturnValue(of()),
    onLangChange: new EventEmitter<LangChangeEvent>(),
    onTranslationChange: new EventEmitter(),
    onDefaultLangChange: new EventEmitter(),
  } as unknown as TranslateService;

  it('should create', async () => {
    fixture = await render(LogoComponent, {
      providers: [{ provide: TranslateService, useValue: translateService }],
    });
    component = fixture.fixture.componentInstance;

    expect(component).toBeTruthy();
  });
});
