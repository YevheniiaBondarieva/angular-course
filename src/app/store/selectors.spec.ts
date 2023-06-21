import { Course } from '../shared/models/course.models';
import { User } from '../shared/models/user.models';
import { selectCourseById, selectCourses, selectUserName } from './selectors';

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
  const coursesState: { courses: Course[] } = {
    courses: [
      {
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
      {
        id: 2,
        name: 'Test 2',
        description: 'Test 2',
        isTopRated: true,
        date: '2023-05-10',
        authors: [],
        length: 59,
      },
    ],
  };

  it('should select user name', () => {
    const selectedName = selectUserName(userState);

    expect(selectedName).toEqual({ first: 'John', last: 'Doe' });
  });

  it('should select courses', () => {
    const selectedCourses = selectCourses(coursesState);

    expect(selectedCourses).toEqual(coursesState.courses);
  });

  it('should select course by id', () => {
    const selectedCourseById = selectCourseById(1)(coursesState);

    expect(selectedCourseById).toEqual(coursesState.courses[0]);
  });
});
