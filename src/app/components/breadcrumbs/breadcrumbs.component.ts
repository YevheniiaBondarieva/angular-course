import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, filter, throwError } from 'rxjs';

import { Course } from '../../shared/models/course.models';
import { CoursesService } from '../../shared/services/courses.service';

@Component({
  selector: 'app-breadcrumbs',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss'],
})
export class BreadcrumbsComponent implements OnInit {
  coursesService = inject(CoursesService);
  router = inject(Router);
  courseName: string | undefined;

  ngOnInit() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        if (event instanceof NavigationEnd) {
          const urlSegments = event.url.split('/');
          const courseId = urlSegments[urlSegments.length - 1];
          if (isNaN(Number(courseId))) {
            this.courseName = undefined;
            return;
          }
          this.coursesService
            .getCourseItemById(courseId)
            .pipe(
              catchError((error: HttpErrorResponse) => {
                console.log(error.message);
                this.courseName = undefined;
                return throwError(() => error);
              }),
            )
            .subscribe((course: Course) => {
              this.courseName = course.name;
            });
        }
      });
  }
}
