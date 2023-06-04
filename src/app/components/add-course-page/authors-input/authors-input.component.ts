import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-authors-input',
  templateUrl: './authors-input.component.html',
  styleUrls: ['./authors-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthorsInputComponent {}
