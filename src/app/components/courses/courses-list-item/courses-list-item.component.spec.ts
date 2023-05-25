import { CoursesListItemComponent } from './courses-list-item.component';
import { RenderResult, fireEvent, render } from '@testing-library/angular';

describe('CoursesListItemComponent', () => {
  let fixture: RenderResult<CoursesListItemComponent>;
  let component: CoursesListItemComponent;

  beforeEach(async () => {
    fixture = await render(CoursesListItemComponent, {
      componentProperties: {
        courseItem: {
          id: 2,
          name: 'Test Course 1',
          description: 'Course descriptions',
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
      },
    });
    component = fixture.fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit deleteCourse event on delete button click', async () => {
    jest.spyOn(component.deleteCourse, 'emit');
    const deleteButton = fixture.getByText('Delete');
    await fireEvent.click(deleteButton);
    expect(component.deleteCourse.emit).toHaveBeenCalledWith(2);
  });

  describe('should render', () => {
    it('should render course title correctly', () => {
      const courseTitle = fixture.getByText('Video Course 2.Test Course 1');
      expect(courseTitle).toBeTruthy();
    });

    it('should render course duration correctly', () => {
      const duration = fixture.getByText(157);
      expect(duration).toBeTruthy();
    });

    it('should render course date correctly', () => {
      const date = fixture.getByText('2022-09-28');
      expect(date).toBeTruthy();
    });

    it('should render course description correctly', () => {
      const description = fixture.getByText('Course descriptions');
      expect(description).toBeTruthy();
    });
  });
});
