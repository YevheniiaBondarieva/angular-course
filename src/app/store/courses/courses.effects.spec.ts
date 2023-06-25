import { of } from 'rxjs';
import { Router } from '@angular/router';

import { CoursesService } from '../../shared/services/courses.service';
import * as coursesEffects from './courses.effects';
import { CoursesApiActions } from './courses.actions';
import { Course } from './../../shared/models/course.models';
import { LoadingBlockService } from '../../shared/services/loading-block.service';

describe('effects', () => {
  describe('addCourse', () => {
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
    const coursesServiceMock = {
      createCourse: () => of(course),
    } as unknown as CoursesService;
    const actionsMock$ = of(CoursesApiActions.addCourse({ payload: course }));
    const router = { navigate: jest.fn() } as unknown as Router;
    const loadingBlockService = {
      showLoading: jest.fn(),
      hideLoading: jest.fn(),
    } as unknown as LoadingBlockService;

    it('should loads course successfully', (done) => {
      coursesEffects
        .addCourse$(
          actionsMock$,
          coursesServiceMock,
          router,
          loadingBlockService,
        )
        .subscribe((action) => {
          expect(action).toEqual(
            CoursesApiActions.addCourseSuccess({ payload: course }),
          );
          done();
        });
    });

    it('should navigate to "/courses" after successful course creation', (done) => {
      coursesEffects
        .addCourse$(
          actionsMock$,
          coursesServiceMock,
          router,
          loadingBlockService,
        )
        .subscribe(() => {
          expect(router.navigate).toHaveBeenCalledWith(['/courses']);
          done();
        });
    });
  });

  it('deleteCourse should successfully delete the course', (done) => {
    const courseId = 1;
    const coursesServiceMock = {
      removeCourseItem: () => of({}),
    } as unknown as CoursesService;
    const actionsMock$ = of(
      CoursesApiActions.deleteCourse({ payload: courseId }),
    );
    const loadingBlockService = {
      showLoading: jest.fn(),
      hideLoading: jest.fn(),
    } as unknown as LoadingBlockService;

    coursesEffects
      .deleteCourse$(actionsMock$, coursesServiceMock, loadingBlockService)
      .subscribe((action) => {
        expect(action).toEqual(
          CoursesApiActions.deleteCourseSuccess({ payload: courseId }),
        );
        done();
      });
  });

  describe('updateCourse', () => {
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
    const coursesServiceMock = {
      updateCourseItem: () => of(course),
    } as unknown as CoursesService;
    const actionsMock$ = of(
      CoursesApiActions.updateCourse({ payload: course }),
    );
    const router = { navigate: jest.fn() } as unknown as Router;
    const loadingBlockService = {
      showLoading: jest.fn(),
      hideLoading: jest.fn(),
    } as unknown as LoadingBlockService;

    it('should update course successfully', (done) => {
      coursesEffects
        .updateCourse$(
          actionsMock$,
          coursesServiceMock,
          router,
          loadingBlockService,
        )
        .subscribe((action) => {
          expect(action).toEqual(
            CoursesApiActions.updateCourseSuccess({ payload: course }),
          );
          done();
        });
    });

    it('should navigate to "/courses" after successful course creation', (done) => {
      coursesEffects
        .updateCourse$(
          actionsMock$,
          coursesServiceMock,
          router,
          loadingBlockService,
        )
        .subscribe(() => {
          expect(router.navigate).toHaveBeenCalledWith(['/courses']);
          done();
        });
    });
  });

  it('getCourses should load courses successfully', (done) => {
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
    const startIndex = 0;
    const itemsPerPage = 10;
    const sort = 'date';
    const coursesServiceMock = {
      getCourses: () => of(courses),
    } as unknown as CoursesService;
    const actionsMock$ = of(
      CoursesApiActions.getCourses({
        payload: { startIndex, itemsPerPage, sort },
      }),
    );
    const loadingBlockService = {
      showLoading: jest.fn(),
      hideLoading: jest.fn(),
    } as unknown as LoadingBlockService;

    coursesEffects
      .getCourses$(actionsMock$, coursesServiceMock, loadingBlockService)
      .subscribe((action) => {
        expect(action).toEqual(
          CoursesApiActions.getCoursesSuccess({ payload: courses }),
        );
        done();
      });
  });

  it('getCoursesByFragment should load courses successfully', (done) => {
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
    const fragment = 'Test';
    const sort = 'date';
    const coursesServiceMock = {
      getCoursesByFragment: () => of(courses),
    } as unknown as CoursesService;
    const actionsMock$ = of(
      CoursesApiActions.getCoursesByFragment({
        payload: { fragment, sort },
      }),
    );
    const loadingBlockService = {
      showLoading: jest.fn(),
      hideLoading: jest.fn(),
    } as unknown as LoadingBlockService;

    coursesEffects
      .getCoursesByFragment$(
        actionsMock$,
        coursesServiceMock,
        loadingBlockService,
      )
      .subscribe((action) => {
        expect(action).toEqual(
          CoursesApiActions.getCoursesByFragmentSuccess({ payload: courses }),
        );
        done();
      });
  });

  it('getCourseById should load course successfully', (done) => {
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
    const id = 1;
    const coursesServiceMock = {
      getCourseItemById: () => of(course),
    } as unknown as CoursesService;
    const actionsMock$ = of(
      CoursesApiActions.getCourseById({
        payload: id,
      }),
    );
    const loadingBlockService = {
      showLoading: jest.fn(),
      hideLoading: jest.fn(),
    } as unknown as LoadingBlockService;

    coursesEffects
      .getCourseById$(actionsMock$, coursesServiceMock, loadingBlockService)
      .subscribe((action) => {
        expect(action).toEqual(
          CoursesApiActions.getCourseByIdSuccess({ payload: course }),
        );
        done();
      });
  });
});
