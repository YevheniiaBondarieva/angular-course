import { EventEmitter, Injectable, inject } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Course } from '../models/course.models';
import { Author } from '../models/author.models';

@Injectable({ providedIn: 'root' })
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
    return this.http.get<Course[]>(url).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log(error.message);
        return throwError(() => error);
      }),
    );
  }

  getCoursesByFragment(fragment: string, sort?: string): Observable<Course[]> {
    const url = `${this.apiBaseUrl}?textFragment=${fragment}&sort=${sort}`;
    return this.http.get<Course[]>(url).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log(error.message);
        return throwError(() => error);
      }),
    );
  }

  createCourse(course: Course): Observable<Course> {
    return this.http.post<Course>(this.apiBaseUrl, course).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log(error.message);
        return throwError(() => error);
      }),
    );
  }

  getCourseItemById(id: number | string): Observable<Course> {
    const url = `${this.apiBaseUrl}/${id}`;
    return this.http.get<Course>(url).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log(error.message);
        return throwError(() => error);
      }),
    );
  }

  updateCourseItem(courseItem: Course): Observable<Course> {
    const url = `${this.apiBaseUrl}/${courseItem.id}`;
    return this.http.patch<Course>(url, courseItem).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log(error.message);
        return throwError(() => error);
      }),
    );
  }

  removeCourseItem(id: number | string): Observable<void> {
    const url = `${this.apiBaseUrl}/${id}`;
    return this.http.delete<void>(url).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log(error.message);
        return throwError(() => error);
      }),
    );
  }

  getAuthorsByFragment(fragment: string): Observable<Author[]> {
    const url = `http://localhost:3004/authors?textFragment=${fragment}`;
    return this.http.get<Author[]>(url).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log(error.message);
        return throwError(() => error);
      }),
    );
  }
}
