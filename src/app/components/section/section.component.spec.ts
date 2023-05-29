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

  it('should emit filterCourses event on onSearchClick', async () => {
    jest.spyOn(component.filterCourses, 'emit');
    component.searchValue = 'hello';
    const searchButton = fixture.container.querySelector(
      'button.search-button',
    );

    await fireEvent.click(searchButton as Element);

    expect(component.filterCourses.emit).toHaveBeenCalledWith(
      component.searchValue,
    );
  });
});
