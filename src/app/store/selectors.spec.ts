import { EntityState } from '@ngrx/entity';

import { Course } from '../shared/models/course.models';
import { User } from '../shared/models/user.models';
import { UserSelectors, CourseSelectors } from './selectors';

describe('selectors', () => {
  const userState: { user: User } = {
    user: {
      id: 1,
      token: 'abc123',
      name: { first: 'John', last: 'Doe' },
      login: 'johndoe',
      password: 'password',
    },
  };
  const coursesState: { courses: EntityState<Course> } = {
    courses: {
      ids: [1, 2],
      entities: {
        1: {
          id: 1,
          name: 'Test',
          description: 'Test',
          isTopRated: true,
          date: '2023-05-10',
          authors: [
            {
              id: '4',
              name: 'Kary',
              lastName: 'Kok',
            },
          ],
          length: 59,
        },
        2: {
          id: 2,
          name: 'Test 2',
          description: 'Test 2',
          isTopRated: true,
          date: '2023-05-10',
          authors: [],
          length: 59,
        },
      },
    },
  };

  it('should select user name', () => {
    const selectedName = UserSelectors.selectUserName(userState);

    expect(selectedName).toEqual({ first: 'John', last: 'Doe' });
  });

  it('should select courses', () => {
    const selectedCourses = CourseSelectors.selectCourses(coursesState);
    const expectedCourses = [
      {
        authors: [{ id: '4', lastName: 'Kok', name: 'Kary' }],
        date: '2023-05-10',
        description: 'Test',
        id: 1,
        isTopRated: true,
        length: 59,
        name: 'Test',
      },
      {
        authors: [],
        date: '2023-05-10',
        description: 'Test 2',
        id: 2,
        isTopRated: true,
        length: 59,
        name: 'Test 2',
      },
    ];

    expect(selectedCourses).toEqual(expectedCourses);
  });

  it('should select course by id', () => {
    const selectedCourseById =
      CourseSelectors.selectCourseById(1)(coursesState);
    const expectedCourse = {
      id: 1,
      name: 'Test',
      description: 'Test',
      isTopRated: true,
      date: '2023-05-10',
      authors: [
        {
          id: '4',
          name: 'Kary',
          lastName: 'Kok',
        },
      ],
      length: 59,
    };

    expect(selectedCourseById).toEqual(expectedCourse);
  });
});
