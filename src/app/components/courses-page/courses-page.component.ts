import { inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from '../header/header.component';
import { BreadcrumbsComponent } from '../breadcrumbs/breadcrumbs.component';
import { CoursesComponent } from '../courses/courses.component';
import { SectionComponent } from '../section/section.component';
import { Course } from '../../shared/models/course.models';
import { FilterPipe } from '../../shared/pipes/filter/filter.pipe';
import { OrderByPipe } from '../../shared/pipes/order-by/order-by.pipe';
import { CoursesService } from '../../shared/services/courses.service';

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
  providers: [OrderByPipe, FilterPipe, CoursesService],
  templateUrl: './courses-page.component.html',
  styleUrls: ['./courses-page.component.scss'],
})
export class CoursesPageComponent implements OnInit {
  coursesArray: Course[] = [];
  filteredCoursesArray: Course[] = [];
  searchValue: string | undefined;
  orderByPipe = inject(OrderByPipe);
  filterPipe = inject(FilterPipe);

  constructor(private coursesService: CoursesService) {}

  ngOnInit(): void {
    console.log('ngOnInit');
    this.coursesArray = this.coursesService.getCourses();
    this.coursesService.coursesChanged.subscribe((courses: Course[]) => {
      this.coursesArray = courses;
    });
    this.coursesArray = this.orderByPipe.transform(this.coursesArray);
  }

  onSearchItem(searchValue: string | undefined): void {
    this.searchValue = searchValue;
    this.filteredCoursesArray = this.filterPipe.transform(
      this.coursesArray,
      this.searchValue,
    );
  }
}
