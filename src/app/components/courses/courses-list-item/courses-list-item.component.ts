import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Course } from 'src/app/shared/models/course.models';
import { CreationDateDirective } from '../../../shared/directives/creation-date/creation-date.directive';
import { DurationPipe } from '../../../shared/pipes/duration/duration.pipe';
import { CoursesService } from '../../../shared/services/courses.service';

@Component({
  selector: 'app-courses-list-item',
  standalone: true,
  imports: [CommonModule, CreationDateDirective, DurationPipe],
  templateUrl: './courses-list-item.component.html',
  styleUrls: ['./courses-list-item.component.scss'],
})
export class CoursesListItemComponent {
  @Input() courseItem: Course | undefined = undefined;

  constructor(private coursesService: CoursesService) {}

  onDeleteCouse(id: string | number | undefined): void {
    const confirmation = confirm('Do you really want to delete this course?');
    if (confirmation && id) {
      this.coursesService.removeCourseItem(id);
    }
  }
}
