import { Component, DestroyRef, Input, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouteReuseStrategy, Router, RouterOutlet } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

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
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
  @Input() id!: number | string;
  coursesService = inject(CoursesService);
  router = inject(Router);
  strategyFacade = inject(StrategyFacade);
  destroyRef = inject(DestroyRef);
  course: Course | undefined;
  IsExist = false;
  courseTitle: string | undefined;
  courseDescription: string | undefined;
  courseDuration: number | undefined;
  courseDate: string | undefined;
  courseAuthors: Author[] | undefined;
  CourseIsTopRated = false;

  ngOnInit() {
    const strategy = this.id ? Strategy.Edit : Strategy.Create;
    this.strategyFacade.registerStrategy(strategy);
    if (this.id) {
      this.coursesService
        .getCourseItemById(Number(this.id))
        .pipe(
          catchError((error: HttpErrorResponse) => {
            console.log(error.message);
            return throwError(() => error);
          }),
          takeUntilDestroyed(this.destroyRef),
        )
        .subscribe((response: Course) => {
          console.log(response);
          this.course = response;
          this.fillFormFields();
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
