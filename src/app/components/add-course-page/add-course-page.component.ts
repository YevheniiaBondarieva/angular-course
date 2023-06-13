import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  ActivatedRoute,
  Params,
  RouteReuseStrategy,
  Router,
  RouterOutlet,
} from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { DurationInputComponent } from './duration-input/duration-input.component';
import { DateInputComponent } from './date-input/date-input.component';
import { AuthorsInputComponent } from './authors-input/authors-input.component';
import { CoursesService } from '../../shared/services/courses.service';
import { Course } from '../../shared/models/course.models';
import { Author } from '../../shared/models/author.models';
import { CustomRouteReuseStrategy } from '../../shared/strategy/custom-route-reuse.strategy';
import { StrategyFacade } from '../../shared/services/strategy-facade.service';
import { Strategy } from '../../shared/models/course-form.model';
import { CreateCourseService } from '../../shared/services/create-course.service';
import { EditCourseService } from '../../shared/services/edit-course.service';

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
    CreateCourseService,
    EditCourseService,
    StrategyFacade,
  ],
})
export default class AddCoursePageComponent implements OnInit {
  coursesService = inject(CoursesService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  strategyFacade = inject(StrategyFacade);
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
      const path = this.route.snapshot.url.join('/');
      const strategy = path.includes('new') ? Strategy.Create : Strategy.Edit;
      this.strategyFacade.registerStrategy(strategy);
      this.id = params['id'];
      this.editMode = params['id'] != null;
    });
    if (this.editMode) {
      this.coursesService.getCourseItemById(Number(this.id)).subscribe({
        next: (response) => {
          console.log(response);
          this.course = response;
          this.fillFormFields();
        },
        error: (error: HttpErrorResponse) => {
          console.log(error.message);
        },
      });
    }
  }

  fillFormFields(): void {
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
      id: Number(this.id),
      name: this.courseTitle || '',
      description: this.courseDescription || '',
      isTopRated: this.CourseIsTopRated,
      date: this.courseDate || '',
      authors: this.courseAuthors || [],
      length: this.courseDuration || 0,
    };
    this.strategyFacade.submit(this.course);
  }

  onCancel(): void {
    this.router.navigate(['/courses']);
  }
}
