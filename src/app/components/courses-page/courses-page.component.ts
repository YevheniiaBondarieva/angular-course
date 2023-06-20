import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import { CoursesComponent } from '../courses/courses.component';
import { SectionComponent } from '../section/section.component';
import { OrderByPipe } from '../../shared/pipes/order-by/order-by.pipe';
import { FilterPipe } from '../../shared/pipes/filter/filter.pipe';

@Component({
  selector: 'app-courses-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, SectionComponent, CoursesComponent, RouterOutlet],
  templateUrl: './courses-page.component.html',
  styleUrls: ['./courses-page.component.scss'],
  providers: [OrderByPipe, FilterPipe],
})
export default class CoursesPageComponent {
  searchValue: string | undefined;

  onSearchItem(searchValue: string | undefined): void {
    this.searchValue = searchValue;
  }
}
