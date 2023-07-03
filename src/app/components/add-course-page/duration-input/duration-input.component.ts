/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  FormsModule,
  NgControl,
  ReactiveFormsModule,
} from '@angular/forms';

import { DurationPipe } from '../../../shared/pipes/duration/duration.pipe';

@Component({
  standalone: true,
  selector: 'app-duration-input',
  templateUrl: './duration-input.component.html',
  styleUrls: ['./duration-input.component.scss'],
  imports: [CommonModule, FormsModule, DurationPipe, ReactiveFormsModule],
})
export class DurationInputComponent implements ControlValueAccessor {
  ngControl = inject(NgControl);

  constructor() {
    this.ngControl.valueAccessor = this;
  }

  onChange(value: number) {}

  onTouch() {}

  get durationControl(): FormControl {
    return <FormControl>this.ngControl?.control;
  }

  get isDurationRequired(): boolean {
    return (
      this.ngControl.control?.errors?.['required'] &&
      this.ngControl.control.touched
    );
  }

  get isInvalidNumber(): boolean {
    return (
      this.ngControl.control?.errors?.['invalidNumber'] &&
      this.ngControl.control.touched
    );
  }

  writeValue(obj: number): void {
    this.onChange(obj);
  }

  registerOnChange(fn: (value: number) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouch = fn;
  }
}
