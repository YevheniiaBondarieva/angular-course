import { Component, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { BreadcrumbsComponent } from '../breadcrumbs/breadcrumbs.component';
import { FooterComponent } from '../footer/footer.component';
import { CoursesComponent } from '../courses/courses.component';
import { SectionComponent } from '../section/section.component';
import { courses } from 'src/app/shared/data/courses.data';
import { Course } from 'src/app/shared/models/course.models';

@Component({
  selector: 'app-courses-page',
  standalone: true,
  imports: [
    CommonModule,
    SectionComponent,
    HeaderComponent,
    BreadcrumbsComponent,
    FooterComponent,
    CoursesComponent,
  ],
  templateUrl: './courses-page.component.html',
  styleUrls: ['./courses-page.component.scss'],
})
export class CoursesPageComponent {
  coursesArray: Course[] = [];

  constructor() {
    console.log('Constructor');
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('ngOnChanges');
    console.log(changes);
  }

  ngOnInit(): void {
    console.log('ngOnInit');
    this.coursesArray = courses;
  }

  onDeleteCourseItem(id: number | string | null): void {
    console.log(id);
  }
}
