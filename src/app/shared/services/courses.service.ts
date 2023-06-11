import { EventEmitter, Injectable } from '@angular/core';

import { Course } from '../models/course.models';

@Injectable()
export class CoursesService {
  coursesChanged = new EventEmitter<Course[]>();
  private courses: Course[] = [
    {
      id: 1,
      name: 'Test Course 1',
      description:
        'Learn about where you czn find course description, what information they include, how they work, and details about various components of a course description. Course descriptions report information about a university or college`s class.They`re published both in course catalog.',
      isTopRated: false,
      date: '2023-09-28',
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
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque, odio!',
      isTopRated: true,
      date: '2023-05-23',
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
    {
      id: 3,
      name: 'Hello',
      description:
        'Learn about where you czn find course description, what information they include, how they work, and details about various components of a course description. Course descriptions report information about a university or college`s class.They`re published both in course catalog.',
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

  getCourses(): Course[] | [] {
    return this.courses.slice();
  }

  createCourse(course: Course): void {
    this.courses.push(course);
    this.coursesChanged.emit(this.courses.slice());
  }

  getCourseItemById(id: number | string): Course | undefined {
    return this.courses.find((course) => course.id === id);
  }

  updateCourseItem(courseItem: Course): void {
    const index = this.courses.findIndex(
      (course) => course.id === courseItem.id,
    );
    if (index !== -1) {
      this.courses[index] = courseItem;
      this.coursesChanged.emit(this.courses.slice());
    }
  }

  removeCourseItem(id: number | string): void {
    const index = this.courses.findIndex((course) => course.id === id);
    if (index !== -1) {
      this.courses.splice(index, 1);
      this.coursesChanged.emit(this.courses.slice());
    }
  }
}
