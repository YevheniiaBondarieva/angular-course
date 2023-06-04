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
  @Output() filterCourses = new EventEmitter<string | undefined>();
  searchValue: string | undefined = undefined;

  onSearchClick(searchValue: string | undefined): void {
    if (searchValue !== undefined) {
      this.filterCourses.emit(searchValue);
    }
  }

  onSearchChange(value: string): void {
    if (value === '') {
      this.searchValue = undefined;
      this.filterCourses.emit(undefined);
    }
  }
}
