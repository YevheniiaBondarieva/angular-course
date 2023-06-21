import {
  Component,
  Input,
  SimpleChanges,
  OnChanges,
  OnInit,
  inject,
  OnDestroy,
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
import { selectCourses } from '../../store/selectors';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule, CoursesListItemComponent, SectionComponent],
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent implements OnInit, OnChanges, OnDestroy {
  @Input() searchValue: string | undefined;
  router = inject(Router);
  private store = inject(Store<{ courses: Course[] }>);
  loadingBlockService = inject(LoadingBlockService);
  private selectCourse$ = this.store
    .select(selectCourses)
    .pipe(takeUntilDestroyed());
  coursesArray: Course[] = [];
  startItemIndex = 0;
  itemsPerPage = 3;

  ngOnInit(): void {
    this.loadCourses();
    this.selectCourse$.subscribe((courses: Course[]) => {
      this.coursesArray = [...courses];
      this.loadingBlockService.hideLoading();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['searchValue']) {
      this.onSearchItem();
    }
  }

  loadCourses(): void {
    this.loadingBlockService.showLoading();
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
    this.loadingBlockService.showLoading();
    if (this.searchValue) {
      this.store.dispatch(
        CoursesApiActions.getCoursesByFragment({
          payload: { fragment: this.searchValue, sort: 'date' },
        }),
      );
    } else {
      this.store.dispatch(CoursesApiActions.destroyCourses());
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
    this.loadingBlockService.showLoading();
    if (confirmation) {
      this.store.dispatch(CoursesApiActions.deleteCourse({ payload: id }));
    }
  }

  onEditCourse(id: string | number): void {
    this.router.navigate([`courses/${id}`]);
  }

  ngOnDestroy(): void {
    this.store.dispatch(CoursesApiActions.destroyCourses());
  }
}
