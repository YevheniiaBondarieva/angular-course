import { EventEmitter, Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Course } from '../models/course.models';

@Injectable()
export class CoursesService {
  coursesChanged = new EventEmitter<Course[]>();
  http = inject(HttpClient);
  private readonly apiBaseUrl = 'http://localhost:3004/courses';

  getCourses(
    start: number,
    count: number,
    sort?: string,
  ): Observable<Course[]> {
    const url = `${this.apiBaseUrl}?start=${start}&count=${count}&sort=${sort}`;
    return this.http.get<Course[]>(url);
  }

  getCoursesByFragment(fragment: string, sort?: string): Observable<Course[]> {
    const url = `${this.apiBaseUrl}?textFragment=${fragment}&sort=${sort}`;
    return this.http.get<Course[]>(url);
  }

  createCourse(course: Course): Observable<Course> {
    return this.http.post<Course>(this.apiBaseUrl, course);
  }

  getCourseItemById(id: number | string): Observable<Course> {
    const url = `${this.apiBaseUrl}/${id}`;
    return this.http.get<Course>(url);
  }

  updateCourseItem(courseItem: Course): Observable<Course> {
    const url = `${this.apiBaseUrl}/${courseItem.id}`;
    return this.http.patch<Course>(url, courseItem);
  }

  removeCourseItem(id: number | string): Observable<void> {
    const url = `${this.apiBaseUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}
