import { Component, Input, OnChanges, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

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
  start = 0;
  count = 3;

  ngOnInit(): void {
    this.loadCourses();
  }

  ngOnChanges(): void {
    this.onSearchItem();
  }

  loadCourses(): void {
    this.coursesService.getCourses(this.start, this.count, 'date').subscribe({
      next: (courses: Course[]) => {
        this.originalCoursesArray = courses;
        this.coursesArray = [...this.originalCoursesArray];
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.message);
      },
    });
  }

  onSearchItem(): void {
    if (this.searchValue) {
      this.coursesService
        .getCoursesByFragment(this.searchValue, 'date')
        .subscribe({
          next: (courses: Course[]) => {
            this.coursesArray = courses;
          },
          error: (error: HttpErrorResponse) => {
            console.log(error.message);
          },
        });
    } else {
      this.coursesArray = [...this.originalCoursesArray];
    }
  }

  onLoadMoreClick(): void {
    this.start += this.count;
    this.loadCourses();
  }

  trackByCourseId(index: number, course: Course): number | string {
    return course.id;
  }

  onDeleteCourse(id: string | number): void {
    const confirmation = confirm('Do you really want to delete this course?');
    if (confirmation) {
      this.coursesService.removeCourseItem(id).subscribe({
        next: () => {
          this.loadCourses();
        },
        error: (error: HttpErrorResponse) => {
          console.log(error.message);
        },
      });
    }
  }

  onEditCourse(id: string | number): void {
    this.router.navigate([`courses/${id}`]);
  }
}
