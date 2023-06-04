import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  standalone: true,
  styleUrls: ['./text-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, FormsModule],
})
export class TextInputComponent {
  @Input() labelClass: string | undefined;
  @Input() inputClass: string | undefined;
  @Input() inputId: string | undefined;
  @Input() label: string | undefined;
  @Input() inputType: string | undefined;
  @Input() inputPlaceholder: string | undefined;
  @Output() inputValueChange = new EventEmitter<number>();
  inputValue: number | undefined;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onInputChange(event: any) {
    this.inputValue = event.target.value;
    this.inputValueChange.emit(this.inputValue);
  }
}
