import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesListItemComponent } from './courses-list-item/courses-list-item.component';
import { Course } from 'src/app/shared/models/course.models';
import { courses } from 'src/app/shared/data/courses.data';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule, CoursesListItemComponent],
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent {
  @Input() coursesList: Course[] = [];
  @Output() deleteCouseItem = new EventEmitter<string | number>();

  onCouseDelete(id: number | string | null): void {
    if (id !== null) {
      this.deleteCouseItem.emit(id);
    }
  }

  onLoadMoreClick(): void {
    console.log('Load More');
  }

  trackByCourseId(index: number, course: Course): number | string {
    return course.id;
  }
}
