/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  DestroyRef,
  Input,
  forwardRef,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  AbstractControl,
  ControlValueAccessor,
  FormControl,
  FormsModule,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  ValidationErrors,
  Validator,
} from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  standalone: true,
  selector: 'app-date-input',
  templateUrl: './date-input.component.html',
  styleUrls: ['./date-input.component.scss'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule, TranslateModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateInputComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: forwardRef(() => DateInputComponent),
    },
  ],
})
export class DateInputComponent
  implements ControlValueAccessor, Validator, AfterViewInit
{
  destroyRef = inject(DestroyRef);
  dateControl = new FormControl('', { nonNullable: true });
  date: string | undefined;

  ngAfterViewInit(): void {
    this.dateControl.setValidators(this.validate.bind(this));
    this.dateControl.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((value) => {
        this.onChange(value);
      });
  }

  onChange(value: string) {}

  onTouch() {}

  validate(control: AbstractControl): ValidationErrors | null {
    const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
    const value = control.value;
    if (!value) {
      return { required: true };
    } else if (!dateRegex.test(value)) {
      return { invalidDateFormat: true };
    }
    return null;
  }

  get isDateRequired(): boolean {
    return this.dateControl.errors?.['required'] && this.dateControl.touched;
  }

  get isInvalidDate(): boolean {
    return (
      this.dateControl.errors?.['invalidDateFormat'] && this.dateControl.touched
    );
  }

  writeValue(obj: string): void {
    if (!obj) {
      return;
    }
    const date = new Date(obj).toLocaleDateString('en-GB');
    this.dateControl.setValue(date);
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouch = fn;
  }
}
