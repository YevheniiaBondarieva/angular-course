import { Course } from '../../shared/models/course.models';
import { CoursesApiActions } from './courses.actions';

describe('CoursesApiActions', () => {
  it('should create addCourse action', () => {
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
    const action = CoursesApiActions.addCourse({ payload: course });

    expect(action).toEqual({
      type: '[Courses API] addCourse',
      payload: course,
    });
  });

  it('should create addCourseSuccess action', () => {
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
    const action = CoursesApiActions.addCourseSuccess({ payload: course });

    expect(action).toEqual({
      type: '[Courses API] addCourseSuccess',
      payload: course,
    });
  });

  it('should create addCourseFailure action', () => {
    const error = new Error('Failed to add course');
    const action = CoursesApiActions.addCourseFailure({ payload: error });

    expect(action).toEqual({
      type: '[Courses API] addCourseFailure',
      payload: error,
    });
  });

  it('should create deleteCourse action', () => {
    const courseId = 1;
    const action = CoursesApiActions.deleteCourse({ payload: courseId });

    expect(action).toEqual({
      type: '[Courses API] deleteCourse',
      payload: courseId,
    });
  });

  it('should create deleteCourseSuccess action', () => {
    const courseId = 1;
    const action = CoursesApiActions.deleteCourseSuccess({
      payload: courseId,
    });

    expect(action).toEqual({
      type: '[Courses API] deleteCourseSuccess',
      payload: courseId,
    });
  });

  it('should create deleteCourseFailure action', () => {
    const error = new Error('Failed to delete course');
    const action = CoursesApiActions.deleteCourseFailure({ payload: error });

    expect(action).toEqual({
      type: '[Courses API] deleteCourseFailure',
      payload: error,
    });
  });

  it('should create updateCourse action', () => {
    const course: Course = {
      id: 1,
      name: 'Test 2',
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
    const action = CoursesApiActions.updateCourse({ payload: course });

    expect(action).toEqual({
      type: '[Courses API] updateCourse',
      payload: course,
    });
  });

  it('should create updateCourseSuccess action', () => {
    const course: Course = {
      id: 1,
      name: 'Test 2',
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
    const action = CoursesApiActions.updateCourseSuccess({ payload: course });

    expect(action).toEqual({
      type: '[Courses API] updateCourseSuccess',
      payload: course,
    });
  });

  it('should create updateCourseFailure action', () => {
    const error = new Error('Failed to update course');
    const action = CoursesApiActions.updateCourseFailure({ payload: error });

    expect(action).toEqual({
      type: '[Courses API] updateCourseFailure',
      payload: error,
    });
  });

  it('should create getCoursesByFragment action', () => {
    const fragment = 'example';
    const sort = 'date';
    const action = CoursesApiActions.getCoursesByFragment({
      payload: { fragment, sort },
    });

    expect(action).toEqual({
      type: '[Courses API] getCoursesByFragment',
      payload: { fragment, sort },
    });
  });

  it('should create getCoursesByFragmentSuccess action', () => {
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

    expect(action).toEqual({
      type: '[Courses API] getCoursesByFragmentSuccess',
      payload: courses,
    });
  });

  it('should create getCoursesByFragmentFailure action', () => {
    const error = new Error('Failed to get courses by fragment');
    const action = CoursesApiActions.getCoursesByFragmentFailure({
      payload: error,
    });

    expect(action).toEqual({
      type: '[Courses API] getCoursesByFragmentFailure',
      payload: error,
    });
  });

  it('should create getCourseById action', () => {
    const courseId = 1;
    const action = CoursesApiActions.getCourseById({ payload: courseId });

    expect(action).toEqual({
      type: '[Courses API] getCourseById',
      payload: courseId,
    });
  });

  it('should create getCourseByIdSuccess action', () => {
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

    expect(action).toEqual({
      type: '[Courses API] getCourseByIdSuccess',
      payload: course,
    });
  });

  it('should create getCourseByIdFailure action', () => {
    const error = new Error('Failed to get course by ID');
    const action = CoursesApiActions.getCourseByIdFailure({ payload: error });

    expect(action).toEqual({
      type: '[Courses API] getCourseByIdFailure',
      payload: error,
    });
  });

  it('should create getCourses action', () => {
    const startIndex = 0;
    const itemsPerPage = 10;
    const sort = 'date';
    const action = CoursesApiActions.getCourses({
      payload: { startIndex, itemsPerPage, sort },
    });

    expect(action).toEqual({
      type: '[Courses API] getCourses',
      payload: { startIndex, itemsPerPage, sort },
    });
  });

  it('should create getCoursesSuccess action', () => {
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

    expect(action).toEqual({
      type: '[Courses API] getCoursesSuccess',
      payload: courses,
    });
  });

  it('should create getCoursesFailure action', () => {
    const error = new Error('Failed to get courses');
    const action = CoursesApiActions.getCoursesFailure({ payload: error });

    expect(action).toEqual({
      type: '[Courses API] getCoursesFailure',
      payload: error,
    });
  });
});
