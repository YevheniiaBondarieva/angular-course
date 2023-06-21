import { Course } from '../../shared/models/course.models';
import { CoursesApiActions } from './courses.actions';
import { coursesReducer } from './courses.reducer';

describe('coursesReducer', () => {
  const initialState: Course[] = [];

  it('should handle addCourseSuccess action', () => {
    const action = CoursesApiActions.addCourseSuccess();
    const state = coursesReducer(initialState, action);

    expect(state).toEqual(initialState);
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
    const action = CoursesApiActions.getCourseByIdSuccess({
      payload: course,
    });
    const state = coursesReducer(initialState, action);

    expect(state).toEqual([course]);
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
    const action = CoursesApiActions.getCoursesSuccess({ payload: courses });
    const state = coursesReducer(initialState, action);

    expect(state).toEqual(courses);
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
    const action = CoursesApiActions.getCoursesByFragmentSuccess({
      payload: courses,
    });
    const state = coursesReducer(initialState, action);

    expect(state).toEqual(courses);
  });

  it('should update course on updateCourseSuccess', () => {
    const initialCourse: Course = {
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
    const state = coursesReducer([initialCourse], action);

    expect(state).toEqual([updatedCourse]);
  });

  it('should remove course on deleteCourseSuccess', () => {
    const courseId = 1;
    const course: Course = {
      id: 1,
      name: 'Test 2',
      description: 'Test 2',
      isTopRated: true,
      date: '2023-05-10',
      authors: [],
      length: 59,
    };
    const action = CoursesApiActions.deleteCourseSuccess({
      payload: courseId,
    });
    const state = coursesReducer([course], action);

    expect(state).toEqual([]);
  });

  it('should reset state on destroyCourses', () => {
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
    const action = CoursesApiActions.destroyCourses();
    const state = coursesReducer(courses, action);

    expect(state).toEqual(initialState);
  });
});
