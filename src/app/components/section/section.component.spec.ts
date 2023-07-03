import { fakeAsync, tick } from '@angular/core/testing';
import { RenderResult, fireEvent, render } from '@testing-library/angular';
import { EventEmitter } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';

import { SectionComponent } from './section.component';

describe('SectionComponent', () => {
  let fixture: RenderResult<SectionComponent>;
  let component: SectionComponent;
  const translateService = {
    use: jest.fn(),
    get: jest.fn().mockReturnValue(of()),
    onLangChange: new EventEmitter<LangChangeEvent>(),
    onTranslationChange: new EventEmitter(),
    onDefaultLangChange: new EventEmitter(),
  } as unknown as TranslateService;

  beforeEach(async () => {
    fixture = await render(SectionComponent, {
      providers: [{ provide: TranslateService, useValue: translateService }],
    });
    component = fixture.fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('updates searchValue on input change', async () => {
    const input = fixture.container.querySelector('form input.search-input');

    await fireEvent.input(input as Element, { target: { value: 'test' } });

    expect(component.searchForm.value.search).toBe('test');
  });

  it('emits filtered value through filterCourses', fakeAsync(() => {
    const filterValue = 'test';

    component.ngOnInit();

    component.filterCourses.subscribe((value) => {
      expect(value).toBe(filterValue);
    });
    component.searchForm.get('search')?.setValue(filterValue);
    component.onSearchChange();

    tick(300);
  }));
});
