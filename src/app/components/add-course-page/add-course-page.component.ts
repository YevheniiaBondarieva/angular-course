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
import { take } from 'rxjs';

import { DurationInputComponent } from './duration-input/duration-input.component';
import { DateInputComponent } from './date-input/date-input.component';
import { AuthorsInputComponent } from './authors-input/authors-input.component';
import { Course } from '../../shared/models/course.models';
import { Author } from '../../shared/models/author.models';
import { CustomRouteReuseStrategy } from '../../shared/strategy/custom-route-reuse.strategy';
import { StrategyFacade } from '../../shared/services/strategy-facade.service';
import { AddCourseForm, Strategy } from '../../shared/models/course-form.model';
import { CreateCourseService } from '../../shared/services/create-course.service';
import { EditCourseService } from '../../shared/services/edit-course.service';
import { CoursesApiActions } from '../../store/courses/courses.actions';
import { CourseSelectors } from '../../store/selectors';
import { CoursesService } from '../../shared/services/courses.service';
import { AddCourseFunctions } from './add-course-page.functions';

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
  allAuthors: Author[] | [] = [];

  ngOnInit() {
    this.addCourseForm = new FormGroup<AddCourseForm>({
      id: new FormControl('', { nonNullable: true }),
      name: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.maxLength(50)],
      }),
      description: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.maxLength(500)],
      }),
      isTopRated: new FormControl(false, { nonNullable: true }),
      date: new FormControl('', { nonNullable: true }),
      authors: new FormArray<FormControl<Author>>([]),
      length: new FormControl(0, { nonNullable: true }),
    });

    this.coursesService
      .getAuthorsByFragment('')
      .pipe(take(1))
      .subscribe((result) => {
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
          AddCourseFunctions.fillFormFields(this.addCourseForm, this.course);
        });
    }
  }

  get lengthControl() {
    return <FormControl>this.addCourseForm.get('length');
  }

  get dateControl() {
    return <FormControl>this.addCourseForm.get('date');
  }

  get authorsControl() {
    return <FormArray>this.addCourseForm.get('authors');
  }

  get isNameRequired(): boolean {
    const nameControl = this.addCourseForm.get('name');
    return nameControl?.errors?.['required'] && nameControl.touched;
  }

  get isNameMaxLength(): boolean {
    const nameControl = this.addCourseForm.get('name');
    return nameControl?.errors?.['maxlength'] && nameControl.touched;
  }

  get isDescriptionRequired(): boolean {
    const descriptionControl = this.addCourseForm.get('description');
    return (
      descriptionControl?.errors?.['required'] && descriptionControl.touched
    );
  }

  get isDescriptionMaxLength(): boolean {
    const descriptionControl = this.addCourseForm.get('description');
    return (
      descriptionControl?.errors?.['maxlength'] && descriptionControl.touched
    );
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
