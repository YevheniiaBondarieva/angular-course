import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { DurationInputComponent } from './duration-input/duration-input.component';
import { DateInputComponent } from './date-input/date-input.component';
import { AuthorsInputComponent } from './authors-input/authors-input.component';

@Component({
  selector: 'app-add-course-page',
  standalone: true,
  templateUrl: './add-course-page.component.html',
  styleUrls: ['./add-course-page.component.scss'],
  imports: [
    DurationInputComponent,
    FormsModule,
    DateInputComponent,
    AuthorsInputComponent,
  ],
})
export class AddCoursePageComponent {
  onSave(): void {
    // Обробник події для кнопки "Save"
  }

  onCancel(): void {
    // Обробник події для кнопки "Cancel"
  }
}
