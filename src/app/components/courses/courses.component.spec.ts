import { CoursesComponent } from './courses.component';
import { RenderResult, fireEvent, render } from '@testing-library/angular';

describe('CoursesComponent', () => {
  let fixture: RenderResult<CoursesComponent>;
  let component: CoursesComponent;

  beforeEach(async () => {
    fixture = await render(CoursesComponent);
    component = fixture.fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit deleteCouseItem event on course delete', () => {
    jest.spyOn(component.deleteCouseItem, 'emit');
    const courseId = 1;
    component.onCouseDelete(courseId);
    expect(component.deleteCouseItem.emit).toHaveBeenCalledWith(courseId);
  });

  it('should call onLoadMoreClick method on Load More button click', async () => {
    jest.spyOn(component, 'onLoadMoreClick');

    const loadMoreButton = fixture.container.querySelector('button.load-more');
    await fireEvent.click(loadMoreButton as Element);
    expect(component.onLoadMoreClick).toHaveBeenCalled();
  });

  it('should render coursesList', () => {
    component.coursesList = [
      {
        id: 1,
        name: 'Test Course 1',
        description: 'Course description 1',
        isTopRated: false,
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
      {
        id: 2,
        name: 'Test Course 2',
        description: 'Course description 2',
        isTopRated: true,
        date: '2022-09-28',
        authors: [
          {
            id: '2',
            name: 'Kira',
            lastName: 'Bruce',
          },
          {
            id: '3',
            name: 'Olha',
            lastName: 'Kosa',
          },
        ],
        length: 157,
      },
    ];
    fixture.detectChanges();

    const coursesListItems = fixture.container.querySelectorAll(
      'app-courses-list-item',
    );
    expect(coursesListItems.length).toBe(2);
  });
});
