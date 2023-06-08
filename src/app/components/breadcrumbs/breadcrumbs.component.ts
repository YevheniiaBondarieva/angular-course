import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Params, Router, RouterModule } from '@angular/router';

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
  route = inject(ActivatedRoute);
  id!: number | string;
  courseName: string | undefined;

  ngOnInit() {
    console.log('init');
    this.route.params.subscribe((params: Params) => {
      console.log('init2');
      this.id = params['id'];
    });
    if (this.id) {
      this.courseName = this.coursesService.getCourseItemById(+this.id)?.name;
    }
  }
}
