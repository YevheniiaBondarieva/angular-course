import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { TextInputComponent } from './text-input/text-input.component';
import { DurationPipe } from '../../shared/pipes/duration/duration.pipe';

@Component({
  selector: 'app-add-course-page',
  standalone: true,
  templateUrl: './add-course-page.component.html',
  styleUrls: ['./add-course-page.component.scss'],
  imports: [TextInputComponent, DurationPipe, FormsModule],
})
export class AddCoursePageComponent {
  inputValue: number | undefined;

  onInputValueChange(newValue: number) {
    this.inputValue = Number(newValue);
  }

  onSave(): void {
    // Обробник події для кнопки "Save"
  }

  onCancel(): void {
    // Обробник події для кнопки "Cancel"
  }
}
