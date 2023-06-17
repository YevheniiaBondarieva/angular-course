import {
  Component,
  Input,
  SimpleChanges,
  OnChanges,
  OnInit,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { CoursesListItemComponent } from './courses-list-item/courses-list-item.component';
import { Course } from '../../shared/models/course.models';
import { CoursesService } from '../../shared/services/courses.service';
import { SectionComponent } from '../section/section.component';
import { LoadingBlockComponent } from '../loading-block/loading-block.component';
import { LoadingBlockService } from '../../shared/services/loading-block.service';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [
    CommonModule,
    CoursesListItemComponent,
    LoadingBlockComponent,
    SectionComponent,
  ],
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
  providers: [LoadingBlockService],
})
export class CoursesComponent implements OnInit, OnChanges {
  @Input() searchValue: string | undefined;
  coursesService = inject(CoursesService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  loadingBlockService = inject(LoadingBlockService);
  originalCoursesArray: Course[] = [];
  coursesArray: Course[] = [];
  startItemIndex = 0;
  itemsPerPage = 3;

  ngOnInit(): void {
    this.loadCourses();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['searchValue']) {
      this.onSearchItem();
    }
  }

  loadCourses(): void {
    this.loadingBlockService.show = true;
    this.coursesService
      .getCourses(this.startItemIndex, this.itemsPerPage, 'date')
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.log(error.message);
          this.loadingBlockService.show = false;
          return throwError(() => error);
        }),
      )
      .subscribe((courses: Course[]) => {
        this.originalCoursesArray = courses;
        this.coursesArray = [...this.originalCoursesArray];
        this.loadingBlockService.show = false;
      });
  }

  onSearchItem(): void {
    this.loadingBlockService.show = true;
    if (this.searchValue) {
      this.coursesService
        .getCoursesByFragment(this.searchValue, 'date')
        .pipe(
          catchError((error: HttpErrorResponse) => {
            console.log(error.message);
            this.loadingBlockService.show = false;
            return throwError(() => error);
          }),
        )
        .subscribe((courses: Course[]) => {
          this.coursesArray = courses;
          this.loadingBlockService.show = false;
        });
    } else {
      this.coursesArray = [...this.originalCoursesArray];
      this.loadingBlockService.show = false;
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
    this.loadingBlockService.show = true;
    if (confirmation) {
      this.coursesService
        .removeCourseItem(id)
        .pipe(
          catchError((error: HttpErrorResponse) => {
            console.log(error.message);
            this.loadingBlockService.show = false;
            return throwError(() => error);
          }),
        )
        .subscribe(() => {
          this.loadCourses();
          this.loadingBlockService.show = false;
        });
    }
  }

  onEditCourse(id: string | number): void {
    this.router.navigate([`courses/${id}`]);
  }
}
