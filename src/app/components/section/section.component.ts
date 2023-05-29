import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-section',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss'],
})
export class SectionComponent {
  searchValue: string | undefined = undefined;
  @Output() filterCourses = new EventEmitter<string | undefined>();

  onSearchClick(searchValue: string | undefined): void {
    if (searchValue !== undefined) {
      this.filterCourses.emit(searchValue);
    }
  }
}
