import { Component, Input, OnChanges, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { CoursesListItemComponent } from './courses-list-item/courses-list-item.component';
import { Course } from '../../shared/models/course.models';
import { CoursesService } from '../../shared/services/courses.service';
import { SectionComponent } from '../section/section.component';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule, CoursesListItemComponent, SectionComponent],
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent implements OnInit, OnChanges {
  @Input() searchValue: string | undefined;
  coursesService = inject(CoursesService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  originalCoursesArray: Course[] = [];
  coursesArray: Course[] = [];
  startItemIndex = 0;
  itemsPerPage = 3;

  ngOnInit(): void {
    this.loadCourses();
  }

  ngOnChanges(): void {
    this.onSearchItem();
  }

  loadCourses(): void {
    this.coursesService
      .getCourses(this.startItemIndex, this.itemsPerPage, 'date')
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.log(error.message);
          return throwError(() => error);
        }),
      )
      .subscribe((courses: Course[]) => {
        this.originalCoursesArray = courses;
        this.coursesArray = [...this.originalCoursesArray];
      });
  }

  onSearchItem(): void {
    if (this.searchValue) {
      this.coursesService
        .getCoursesByFragment(this.searchValue, 'date')
        .pipe(
          catchError((error: HttpErrorResponse) => {
            console.log(error.message);
            return throwError(() => error);
          }),
        )
        .subscribe((courses: Course[]) => {
          this.coursesArray = courses;
        });
    } else {
      this.coursesArray = [...this.originalCoursesArray];
    }
  }

  onLoadMoreClick(): void {
    this.startItemIndex += this.itemsPerPage;
    this.loadCourses();
  }

  trackByCourseId(index: number, course: Course): number | string {
    return course.id;
  }

  onDeleteCourse(id: string | number): void {
    const confirmation = confirm('Do you really want to delete this course?');
    if (confirmation) {
      this.coursesService
        .removeCourseItem(id)
        .pipe(
          catchError((error: HttpErrorResponse) => {
            console.log(error.message);
            return throwError(() => error);
          }),
        )
        .subscribe(() => {
          this.loadCourses();
        });
    }
  }

  onEditCourse(id: string | number): void {
    this.router.navigate([`courses/${id}`]);
  }
}
