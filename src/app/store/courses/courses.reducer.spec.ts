import { Course } from '../../shared/models/course.models';
import { CoursesApiActions } from './courses.actions';
import { coursesReducer } from './courses.reducer';

describe('coursesReducer', () => {
  const initialState = coursesReducer(undefined, {} as any);

  it('should handle addCourseSuccess action', () => {
    const course: Course = {
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
    const expectedState = {
      entities: {
        '1': {
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
      },
      ids: [1],
    };
    const action = CoursesApiActions.addCourseSuccess({ payload: course });
    const state = coursesReducer(initialState, action);

    expect(state).toEqual(expectedState);
  });

  it('should update state on getCourseByIdSuccess', () => {
    const course: Course = {
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
    const expectedState = {
      entities: {
        '1': {
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
      },
      ids: [1],
    };
    const action = CoursesApiActions.getCourseByIdSuccess({
      payload: course,
    });
    const state = coursesReducer(initialState, action);

    expect(state).toEqual(expectedState);
  });

  it('should add courses on getCoursesSuccess', () => {
    const courses: Course[] = [
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
    ];
    const expectedState = {
      entities: {
        '1': {
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
        '2': {
          id: 2,
          name: 'Test 2',
          description: 'Test 2',
          isTopRated: true,
          date: '2023-05-10',
          authors: [],
          length: 59,
        },
      },
      ids: [1, 2],
    };
    const action = CoursesApiActions.getCoursesSuccess({ payload: courses });
    const state = coursesReducer(initialState, action);

    expect(state).toEqual(expectedState);
  });

  it('should update state on getCoursesByFragmentSuccess', () => {
    const courses: Course[] = [
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
    ];
    const expectedState = {
      entities: {
        '1': {
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
      },
      ids: [1],
    };
    const action = CoursesApiActions.getCoursesByFragmentSuccess({
      payload: courses,
    });
    const state = coursesReducer(initialState, action);

    expect(state).toEqual(expectedState);
  });

  it('should update course on updateCourseSuccess', () => {
    const initialCourseState = {
      entities: {
        '1': {
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
      },
      ids: [1],
    };
    const expectedCourseState = {
      entities: {
        '1': {
          id: 1,
          name: 'Test 2',
          description: 'Test 2',
          isTopRated: true,
          date: '2023-05-10',
          authors: [],
          length: 59,
        },
      },
      ids: [1],
    };
    const updatedCourse: Course = {
      id: 1,
      name: 'Test 2',
      description: 'Test 2',
      isTopRated: true,
      date: '2023-05-10',
      authors: [],
      length: 59,
    };
    const action = CoursesApiActions.updateCourseSuccess({
      payload: updatedCourse,
    });
    const state = coursesReducer(initialCourseState, action);

    expect(state).toEqual(expectedCourseState);
  });

  it('should remove course on deleteCourseSuccess', () => {
    const courseId = 1;
    const initialCourseState = {
      entities: {
        '1': {
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
      },
      ids: [1],
    };
    const expectedCourseState = { entities: {}, ids: [] };
    const action = CoursesApiActions.deleteCourseSuccess({
      payload: courseId,
    });
    const state = coursesReducer(initialCourseState, action);

    expect(state).toEqual(expectedCourseState);
  });

  it('should handle addCourseFailure action', () => {
    const error = new Error('Failed to add course');
    const action = CoursesApiActions.addCourseFailure({ payload: error });
    const state = coursesReducer(initialState, action);

    expect(state).toEqual(initialState);
  });

  it('should handle getCourseByIdFailure action', () => {
    const error = new Error('Failed to add course');
    const action = CoursesApiActions.getCourseByIdFailure({
      payload: error,
    });
    const state = coursesReducer(initialState, action);

    expect(state).toEqual(initialState);
  });

  it('should handle getCoursesFailure action', () => {
    const error = new Error('Failed to add course');
    const action = CoursesApiActions.getCoursesFailure({
      payload: error,
    });
    const state = coursesReducer(initialState, action);

    expect(state).toEqual(initialState);
  });

  it('should handle getCoursesByFragmentFailure action', () => {
    const error = new Error('Failed to add course');
    const action = CoursesApiActions.getCoursesByFragmentFailure({
      payload: error,
    });
    const state = coursesReducer(initialState, action);

    expect(state).toEqual(initialState);
  });

  it('should handle updateCourseFailure action', () => {
    const error = new Error('Failed to add course');
    const action = CoursesApiActions.updateCourseFailure({
      payload: error,
    });
    const state = coursesReducer(initialState, action);

    expect(state).toEqual(initialState);
  });

  it('should handle deleteCourseFailure action', () => {
    const error = new Error('Failed to add course');
    const action = CoursesApiActions.deleteCourseFailure({
      payload: error,
    });
    const state = coursesReducer(initialState, action);

    expect(state).toEqual(initialState);
  });
});
