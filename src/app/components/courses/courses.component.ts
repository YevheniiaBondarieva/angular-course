import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoursesListItemComponent } from './courses-list-item/courses-list-item.component';
import { Course } from '../../shared/models/course.models';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule, CoursesListItemComponent],
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent {
  @Input() coursesList: Course[] = [];

  onLoadMoreClick(): void {
    console.log('Load More');
  }

  trackByCourseId(index: number, course: Course): number | string {
    return course.id;
  }
}
