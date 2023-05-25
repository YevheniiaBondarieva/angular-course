import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Course } from 'src/app/shared/models/course.models';
import { CreationDateDirective } from '../../../shared/directives/creation-date/creation-date.directive';
import { DurationPipe } from '../../../shared/pipes/duration/duration.pipe';

@Component({
  selector: 'app-courses-list-item',
  standalone: true,
  imports: [CommonModule, CreationDateDirective, DurationPipe],
  templateUrl: './courses-list-item.component.html',
  styleUrls: ['./courses-list-item.component.scss'],
})
export class CoursesListItemComponent {
  @Input() courseItem: Course | undefined = undefined;
  @Output() deleteCourse = new EventEmitter<string | number>();

  onDeleteCouse(course: Course | undefined): void {
    const id = course?.id;
    if (id !== undefined) {
      this.deleteCourse.emit(id);
    }
  }
}
