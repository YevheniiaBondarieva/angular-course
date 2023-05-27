import { inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { BreadcrumbsComponent } from '../breadcrumbs/breadcrumbs.component';
import { CoursesComponent } from '../courses/courses.component';
import { SectionComponent } from '../section/section.component';
import { courses } from './../../shared/data/courses.data';
import { Course } from 'src/app/shared/models/course.models';
import { FilterPipe } from '../../shared/pipes/filter/filter.pipe';
import { OrderByPipe } from '../../shared/pipes/order-by/order-by.pipe';

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
  providers: [OrderByPipe, FilterPipe],
  templateUrl: './courses-page.component.html',
  styleUrls: ['./courses-page.component.scss'],
})
export class CoursesPageComponent implements OnInit {
  coursesArray: Course[] = [];
  filteredCoursesArray: Course[] = [];
  searchValue: string | undefined;
  orderByPipe = inject(OrderByPipe);
  filterPipe = inject(FilterPipe);

  ngOnInit(): void {
    console.log('ngOnInit');
    this.coursesArray = courses;
    this.coursesArray = this.orderByPipe.transform(this.coursesArray);
  }

  onDeleteCourseItem(id: number | string | undefined): void {
    console.log(id);
  }

  onSearchItem(searchValue: string | undefined): void {
    this.searchValue = searchValue;
    this.filteredCoursesArray = this.filterPipe.transform(
      this.coursesArray,
      this.searchValue,
    );
  }
}
