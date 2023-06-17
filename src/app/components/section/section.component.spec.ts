import { fakeAsync, tick } from '@angular/core/testing';

import { SectionComponent } from './section.component';
import { RenderResult, fireEvent, render } from '@testing-library/angular';

describe('SectionComponent', () => {
  let fixture: RenderResult<SectionComponent>;
  let component: SectionComponent;

  beforeEach(async () => {
    fixture = await render(SectionComponent);
    component = fixture.fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('updates searchValue on input change', async () => {
    const input = fixture.container.querySelector('form input.search-input');

    await fireEvent.input(input as Element, { target: { value: 'test' } });

    expect(component.searchValue).toBe('test');
  });

  it('emits filtered value through filterCourses', fakeAsync(() => {
    const filterValue = 'test';
    component.ngOnInit();

    component.filterCourses.subscribe((value) => {
      expect(value).toBe(filterValue);
    });
    component.onSearchChange(filterValue);

    tick(300);
  }));
});
