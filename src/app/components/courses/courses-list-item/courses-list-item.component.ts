import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Course } from 'src/app/shared/models/course.models';

@Component({
  selector: 'app-courses-list-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './courses-list-item.component.html',
  styleUrls: ['./courses-list-item.component.scss'],
})
export class CoursesListItemComponent {
  @Input() courseItem: Course | null = null;
  @Output() deleteCourse = new EventEmitter<string | number>();

  onDeleteCouse(id: number | string | null): void {
    if (id !== null) {
      this.deleteCourse.emit(id);
    }
  }
}
