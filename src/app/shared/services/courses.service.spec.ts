import { CoursesService } from './courses.service';

describe('CoursesService', () => {
  let service: CoursesService;

  beforeEach(() => {
    service = new CoursesService();

    jest.spyOn(service.coursesChanged, 'emit');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return the list of courses', () => {
    const courses = service.getCourses();

    expect(courses).toEqual(service['courses']);
  });

  it('should add a new course', () => {
    const course = {
      id: 3,
      name: 'New Course',
      description: 'New course description',
      isTopRated: false,
      date: '2023-09-30',
      authors: [],
      length: 120,
    };

    service.createCourse(course);

    expect(service['courses']).toContain(course);
  });

  it('should emit the changes', () => {
    const course = {
      id: 3,
      name: 'New Course',
      description: 'New course description',
      isTopRated: false,
      date: '2023-09-30',
      authors: [],
      length: 120,
    };

    service.createCourse(course);

    expect(service.coursesChanged.emit).toHaveBeenCalledWith(
      service['courses'],
    );
  });

  it('should return a course by ID', () => {
    const courseId = 2;
    const expectedCourse = service['courses'][1];
    const course = service.getCourseItemById(courseId);

    expect(course).toEqual(expectedCourse);
  });

  it('should update a course item', () => {
    const updatedCourse = {
      id: 2,
      name: 'Updated Course',
      description: 'Updated course description',
      isTopRated: true,
      date: '2023-05-23',
      authors: [],
      length: 200,
    };

    service.updateCoureItem(updatedCourse);

    expect(service['courses'][1]).toEqual(updatedCourse);
  });

  it('should remove a course item', () => {
    const courseId = 1;
    const expectedCourses = service['courses'].filter(
      (course) => course.id !== courseId,
    );

    service.removeCourseItem(courseId);

    expect(service['courses']).toEqual(expectedCourses);
  });
});
