/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, Input, forwardRef } from '@angular/core';
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

@Component({
  standalone: true,
  selector: 'app-date-input',
  templateUrl: './date-input.component.html',
  styleUrls: ['./date-input.component.scss'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
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
  dateControl = new FormControl('', { nonNullable: true });
  date: string | undefined;

  ngAfterViewInit(): void {
    this.dateControl.setValidators(this.validate.bind(this));
    this.dateControl.valueChanges.subscribe((value) => {
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
