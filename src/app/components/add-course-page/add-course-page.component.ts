import { Component, DestroyRef, Input, OnInit, inject } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouteReuseStrategy, Router, RouterOutlet } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';

import { DurationInputComponent } from './duration-input/duration-input.component';
import { DateInputComponent } from './date-input/date-input.component';
import { AuthorsInputComponent } from './authors-input/authors-input.component';
import { Course } from '../../shared/models/course.models';
import { Author } from '../../shared/models/author.models';
import { CustomRouteReuseStrategy } from '../../shared/strategy/custom-route-reuse.strategy';
import { StrategyFacade } from '../../shared/services/strategy-facade.service';
import { Strategy } from '../../shared/models/course-form.model';
import { CreateCourseService } from '../../shared/services/create-course.service';
import { EditCourseService } from '../../shared/services/edit-course.service';
import { CoursesApiActions } from '../../store/courses/courses.actions';
import { CourseSelectors } from '../../store/selectors';
import { CoursesService } from '../../shared/services/courses.service';

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
    CommonModule,
    RouterOutlet,
    ReactiveFormsModule,
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
  router = inject(Router);
  strategyFacade = inject(StrategyFacade);
  private store = inject(Store<{ courses: Course[] }>);
  destroyRef = inject(DestroyRef);
  coursesService = inject(CoursesService);
  addCourseForm!: FormGroup;
  course: Course | undefined;
  IsExist = false;
  allAuthors: Author[] | [] = [];

  ngOnInit() {
    this.addCourseForm = new FormGroup({
      id: new FormControl(''),
      name: new FormControl('', [
        Validators.required,
        Validators.maxLength(50),
      ]),
      description: new FormControl('', [
        Validators.required,
        Validators.maxLength(500),
      ]),
      isTopRated: new FormControl('false'),
      date: new FormControl(''),
      authors: new FormArray([]),
      length: new FormControl(0),
    });

    this.coursesService.getAuthorsByFragment('').subscribe((result) => {
      this.allAuthors = result;
    });

    const strategy = this.id ? Strategy.Edit : Strategy.Create;
    this.strategyFacade.registerStrategy(strategy);
    if (this.id) {
      this.store.dispatch(
        CoursesApiActions.getCourseById({ payload: this.id }),
      );
      this.store
        .select(CourseSelectors.selectCourseById(Number(this.id)))
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe((course) => {
          this.course = course;
          this.fillFormFields();
        });
    }
  }

  get length() {
    return <FormControl>this.addCourseForm.get('length');
  }

  get date() {
    return <FormControl>this.addCourseForm.get('date');
  }

  get authors() {
    return <FormArray>this.addCourseForm.get('authors');
  }

  fillFormFields(): void {
    if (this.course !== undefined) {
      this.IsExist = true;
      this.addCourseForm.patchValue({
        id: this.course.id,
        name: this.course.name,
        description: this.course.description,
        isTopRated: this.course.isTopRated,
        date: this.course.date,
        length: this.course.length,
      });
      this.addAuthorsToFormArray(this.course.authors);
    }
  }

  addAuthorsToFormArray(authors: Author[]): void {
    const authorsFormArray = this.addCourseForm.get('authors') as FormArray;
    authorsFormArray.clear();
    authors.map((author) => {
      const authorControl = new FormControl({
        id: author.id,
        name: author.name,
        lastName: author.lastName,
      });
      authorsFormArray.push(authorControl);
    });
  }

  onSave(): void {
    this.course = this.addCourseForm.value;
    this.strategyFacade.submit(this.course);
  }

  onCancel(): void {
    this.addCourseForm.reset();
    this.router.navigate(['/courses']);
  }
}
