import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { CoursesService } from '../../shared/services/courses.service';
import { filter } from 'rxjs';

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
          this.courseName = this.coursesService.getCourseItemById(
            Number(courseId),
          )?.name;
        }
      });
  }
}
