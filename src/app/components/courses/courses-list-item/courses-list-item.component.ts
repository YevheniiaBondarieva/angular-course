import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { Course } from '../../../shared/models/course.models';
import { CreationDateDirective } from '../../../shared/directives/creation-date/creation-date.directive';
import { DurationPipe } from '../../../shared/pipes/duration/duration.pipe';

@Component({
  selector: 'app-courses-list-item',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, CreationDateDirective, DurationPipe],
  templateUrl: './courses-list-item.component.html',
  styleUrls: ['./courses-list-item.component.scss'],
})
export class CoursesListItemComponent {
  @Input() courseItem: Course | undefined = undefined;
  @Output() deleteCourse: EventEmitter<string | number> = new EventEmitter<
    string | number
  >();
  @Output() editCourse: EventEmitter<string | number> = new EventEmitter<
    string | number
  >();
  router = inject(Router);
  route = inject(ActivatedRoute);

  onDeleteCouse(id: string | number | undefined): void {
    if (id) {
      this.deleteCourse.emit(id);
    }
  }

  onEditCourse(id: string | number | undefined): void {
    if (id) {
      this.editCourse.emit(id);
    }
  }
}
