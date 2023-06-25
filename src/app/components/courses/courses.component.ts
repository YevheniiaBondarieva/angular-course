import {
  Component,
  Input,
  SimpleChanges,
  OnChanges,
  OnInit,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';

import { CoursesListItemComponent } from './courses-list-item/courses-list-item.component';
import { Course } from '../../shared/models/course.models';
import { SectionComponent } from '../section/section.component';
import { LoadingBlockService } from '../../shared/services/loading-block.service';
import { CoursesApiActions } from '../../store/courses/courses.actions';
import { CourseSelectors } from '../../store/selectors';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule, CoursesListItemComponent, SectionComponent],
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent implements OnInit, OnChanges {
  @Input() searchValue: string | undefined;
  router = inject(Router);
  private store = inject(Store<{ courses: Course[] }>);
  loadingBlockService = inject(LoadingBlockService);
  private selectCourse$ = this.store
    .select(CourseSelectors.selectCourses)
    .pipe(takeUntilDestroyed());
  coursesArray: Course[] = [];
  startItemIndex = 0;
  itemsPerPage = 3;

  ngOnInit(): void {
    this.loadCourses();
    this.selectCourse$.subscribe((courses: Course[]) => {
      console.log(courses);
      this.coursesArray = [...courses];
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['searchValue']) {
      this.onSearchItem();
    }
  }

  loadCourses(): void {
    this.store.dispatch(
      CoursesApiActions.getCourses({
        payload: {
          startIndex: this.startItemIndex,
          itemsPerPage: this.itemsPerPage,
          sort: 'date',
        },
      }),
    );
  }

  onSearchItem(): void {
    if (this.searchValue) {
      this.store.dispatch(
        CoursesApiActions.getCoursesByFragment({
          payload: { fragment: this.searchValue, sort: 'date' },
        }),
      );
    } else {
      this.loadCourses();
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
      this.store.dispatch(CoursesApiActions.deleteCourse({ payload: id }));
    }
  }

  onEditCourse(id: string | number): void {
    this.router.navigate([`courses/${id}`]);
  }
}
