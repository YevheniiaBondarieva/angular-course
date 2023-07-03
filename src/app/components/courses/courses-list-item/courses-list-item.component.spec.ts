import { RenderResult, fireEvent, render } from '@testing-library/angular';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';
import { EventEmitter } from '@angular/core';

import { CoursesListItemComponent } from './courses-list-item.component';

describe('CoursesListItemComponent', () => {
  let fixture: RenderResult<CoursesListItemComponent>;
  let component: CoursesListItemComponent;
  const translateService = {
    use: jest.fn(),
    instant: jest.fn((key: string) => key),
    get: jest.fn((key: string) => of(key)),
    onLangChange: new EventEmitter<LangChangeEvent>(),
    onTranslationChange: new EventEmitter(),
    onDefaultLangChange: new EventEmitter(),
  } as unknown as TranslateService;

  beforeEach(async () => {
    fixture = await render(CoursesListItemComponent, {
      providers: [{ provide: TranslateService, useValue: translateService }],
      componentProperties: {
        courseItem: {
          id: 2,
          name: 'Test Course 1',
          description: 'Course descriptions',
          isTopRated: true,
          date: '2022-09-28',
          authors: [
            {
              id: '1',
              name: 'Polly',
              lastName: 'Sosa',
            },
          ],
          length: 157,
        },
      },
    });
    component = fixture.fixture.componentInstance;

    jest.spyOn(window, 'confirm').mockReturnValue(true);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit deleteCourse event on delete button click', () => {
    const deleteButton = fixture.getByText('courseItem.delete');
    let emittedId: string | number | undefined;

    component.deleteCourse.subscribe((id: string | number | undefined) => {
      emittedId = id;
    });
    fireEvent.click(deleteButton);

    expect(emittedId).toBe(2);
  });

  describe('should render', () => {
    it('should render course title correctly', () => {
      const courseTitle = fixture.getByText(
        'courseItem.videoCourseText 2.TEST COURSE 1',
      );

      expect(courseTitle).toBeTruthy();
    });

    it('should render star icon correctly', () => {
      const star = fixture.container.querySelector('i.fa-star');

      expect(star).toBeTruthy();
    });

    it('should render course duration correctly', () => {
      const duration = fixture.getByText('duration.hoursMinutes');

      expect(duration).toBeTruthy();
    });

    it('should render course date correctly', () => {
      const date = fixture.getByText('28 Sep, 2022');

      expect(date).toBeTruthy();
    });

    it('should render course description correctly', () => {
      const description = fixture.getByText('Course descriptions');

      expect(description).toBeTruthy();
    });
  });
});
