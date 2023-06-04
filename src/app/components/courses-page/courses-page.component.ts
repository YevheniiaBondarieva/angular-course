import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoursesComponent } from '../courses/courses.component';
import { SectionComponent } from '../section/section.component';
import { OrderByPipe } from '../../shared/pipes/order-by/order-by.pipe';
import { FilterPipe } from '../../shared/pipes/filter/filter.pipe';
import { CoursesService } from '../../shared/services/courses.service';

@Component({
  selector: 'app-courses-page',
  standalone: true,
  imports: [CommonModule, SectionComponent, CoursesComponent],
  templateUrl: './courses-page.component.html',
  styleUrls: ['./courses-page.component.scss'],
  providers: [OrderByPipe, FilterPipe, CoursesService],
})
export class CoursesPageComponent {
  searchValue: string | undefined;

  onSearchItem(searchValue: string | undefined): void {
    this.searchValue = searchValue;
  }
}
