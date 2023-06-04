import { Component, Input, OnChanges, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoursesListItemComponent } from './courses-list-item/courses-list-item.component';
import { Course } from '../../shared/models/course.models';
import { CoursesService } from '../../shared/services/courses.service';
import { FilterPipe } from '../../shared/pipes/filter/filter.pipe';
import { OrderByPipe } from '../../shared/pipes/order-by/order-by.pipe';
import { SectionComponent } from '../section/section.component';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule, CoursesListItemComponent, SectionComponent],
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent implements OnInit, OnChanges {
  @Input() searchValue: string | undefined;
  orderByPipe = inject(OrderByPipe);
  coursesService = inject(CoursesService);
  filterPipe = inject(FilterPipe);
  originalCoursesArray: Course[] = [];
  coursesArray: Course[] = [];
  filteredCoursesArray: Course[] = [];

  ngOnInit(): void {
    this.originalCoursesArray = this.coursesService.getCourses();
    this.coursesService.coursesChanged.subscribe((courses: Course[]) => {
      this.originalCoursesArray = courses;
      this.onSearchItem();
    });
    this.coursesArray = this.orderByPipe.transform(this.originalCoursesArray);
  }

  ngOnChanges(): void {
    this.onSearchItem();
  }

  onSearchItem(): void {
    if (this.searchValue) {
      this.filteredCoursesArray = this.filterPipe.transform(
        this.coursesArray,
        this.searchValue,
      );
      if (this.filteredCoursesArray.length > 0) {
        this.coursesArray = [...this.filteredCoursesArray];
      }
    } else {
      this.coursesArray = [...this.originalCoursesArray];
    }
  }

  onLoadMoreClick(): void {
    console.log('Load More');
  }

  trackByCourseId(index: number, course: Course): number | string {
    return course.id;
  }

  onDeleteCourse(id: string | number): void {
    const confirmation = confirm('Do you really want to delete this course?');
    if (confirmation) {
      this.coursesService.removeCourseItem(id);
    }
  }
}
