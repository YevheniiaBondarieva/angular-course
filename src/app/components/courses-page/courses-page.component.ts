import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { BreadcrumbsComponent } from '../breadcrumbs/breadcrumbs.component';
import { CoursesComponent } from '../courses/courses.component';
import { SectionComponent } from '../section/section.component';
import { courses } from './../../shared/data/courses.data';
import { Course } from 'src/app/shared/models/course.models';

@Component({
  selector: 'app-courses-page',
  standalone: true,
  imports: [
    CommonModule,
    SectionComponent,
    HeaderComponent,
    BreadcrumbsComponent,
    CoursesComponent,
  ],
  templateUrl: './courses-page.component.html',
  styleUrls: ['./courses-page.component.scss'],
})
export class CoursesPageComponent implements OnInit {
  coursesArray: Course[] = [];

  constructor() {
    console.log('Constructor');
  }

  ngOnInit(): void {
    console.log('ngOnInit');
    this.coursesArray = courses;
  }

  onDeleteCourseItem(id: number | string | undefined): void {
    console.log(id);
  }
}
