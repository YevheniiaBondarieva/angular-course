import { RenderResult, render } from '@testing-library/angular';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { EventEmitter } from '@angular/core';
import { of } from 'rxjs';

import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  let fixture: RenderResult<FooterComponent>;
  let component: FooterComponent;
  const translateService = {
    use: jest.fn(),
    get: jest
      .fn()
      .mockReturnValue(of('Copyright © Videocourses. All rights reserved')),
    onLangChange: new EventEmitter<LangChangeEvent>(),
    onTranslationChange: new EventEmitter(),
    onDefaultLangChange: new EventEmitter(),
  } as unknown as TranslateService;

  beforeEach(async () => {
    fixture = await render(FooterComponent, {
      providers: [{ provide: TranslateService, useValue: translateService }],
    });
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
