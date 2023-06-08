import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { DurationInputComponent } from './duration-input/duration-input.component';
import { DateInputComponent } from './date-input/date-input.component';
import { AuthorsInputComponent } from './authors-input/authors-input.component';
import {
  ActivatedRoute,
  Params,
  RouteReuseStrategy,
  Router,
  RouterOutlet,
} from '@angular/router';
import { CoursesService } from '../../shared/services/courses.service';
import { Course } from '../../shared/models/course.models';
import { Author } from '../../shared/models/author.models';
import { CustomRouteReuseStrategy } from '../../shared/strategy/custom-route-reuse.strategy';

@Component({
  selector: 'app-add-course-page',
  standalone: true,
  templateUrl: './add-course-page.component.html',
  styleUrls: ['./add-course-page.component.scss'],
  imports: [
    DurationInputComponent,
    FormsModule,
    DateInputComponent,
    AuthorsInputComponent,
    RouterOutlet,
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: CustomRouteReuseStrategy },
  ],
})
export class AddCoursePageComponent implements OnInit {
  coursesService = inject(CoursesService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  course: Course | undefined;
  id!: number | string;
  editMode = false;
  IsExist = false;
  courseTitle: string | undefined;
  courseDescription: string | undefined;
  courseDuration: number | undefined;
  courseDate: string | undefined;
  courseAuthors: Author[] | undefined;
  CourseIsTopRated = false;

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.editMode = params['id'] != null;
    });
    if (this.editMode) {
      this.course = this.coursesService.getCourseItemById(+this.id);
      if (this.course !== undefined) {
        this.IsExist = true;
        this.courseTitle = this.course.name;
        this.CourseIsTopRated = this.course.isTopRated;
        this.courseDescription = this.course.description;
        this.courseDuration = this.course.length;
        this.courseDate = this.course.date;
        this.courseAuthors = this.course.authors;
      }
    }
  }

  onDurationChange(duration: number) {
    this.courseDuration = duration;
  }

  onDateChange(date: string) {
    this.courseDate = date;
  }

  onAuthorsChange(authors: Author[]) {
    this.courseAuthors = authors;
  }

  onSave(): void {
    this.course = {
      id: +this.id,
      name: this.courseTitle || '',
      description: this.courseDescription || '',
      isTopRated: this.CourseIsTopRated,
      date: this.courseDate || '',
      authors: this.courseAuthors || [],
      length: this.courseDuration || 0,
    };
    if (this.editMode && this.IsExist && this.course !== undefined) {
      this.coursesService.updateCoureItem(this.course);
    } else if (this.course !== undefined) {
      this.coursesService.createCourse(this.course);
    }
    this.router.navigate(['/courses']);
  }

  onCancel(): void {
    this.router.navigate(['/courses']);
  }
}
