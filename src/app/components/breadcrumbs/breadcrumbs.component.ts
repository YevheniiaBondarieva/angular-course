import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, filter, of, switchMap } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';

import { Course } from '../../shared/models/course.models';
import { CourseSelectors } from '../../store/selectors';

@Component({
  selector: 'app-breadcrumbs',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule],
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss'],
})
export class BreadcrumbsComponent implements OnInit {
  router = inject(Router);
  private store = inject(Store<{ courses: Course[] }>);
  course$: Observable<Course | undefined> | undefined;

  ngOnInit() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        if (event instanceof NavigationEnd) {
          const urlSegments = event.url.split('/');
          const courseId = urlSegments[urlSegments.length - 1];
          this.course$ = this.store.select(
            CourseSelectors.selectCourseById(Number(courseId)),
          );
          switchMap((courseId: number) => {
            if (isNaN(Number(courseId))) {
              return of(null);
            }
            return this.store.select(
              CourseSelectors.selectCourseById(courseId),
            );
          });
        }
      });
  }
}
