import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Author } from '../../../shared/models/author.models';

@Component({
  standalone: true,
  selector: 'app-authors-input',
  templateUrl: './authors-input.component.html',
  styleUrls: ['./authors-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule],
})
export class AuthorsInputComponent {
  @Input({ required: true }) authors: Author[] | undefined;
  @Output() authorsChange = new EventEmitter<Author[]>();
}
