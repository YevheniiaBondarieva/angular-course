import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

import { DurationPipe } from '../../../shared/pipes/duration/duration.pipe';

@Component({
  standalone: true,
  selector: 'app-duration-input',
  templateUrl: './duration-input.component.html',
  styleUrls: ['./duration-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, FormsModule, DurationPipe],
})
export class DurationInputComponent {
  @Input() duration: number | undefined;
  @Output() durationChange = new EventEmitter<number>();
}
