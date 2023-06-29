/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormControl,
  FormsModule,
  NgControl,
  ReactiveFormsModule,
  ValidationErrors,
} from '@angular/forms';

import { DurationPipe } from '../../../shared/pipes/duration/duration.pipe';

@Component({
  standalone: true,
  selector: 'app-duration-input',
  templateUrl: './duration-input.component.html',
  styleUrls: ['./duration-input.component.scss'],
  imports: [CommonModule, FormsModule, DurationPipe, ReactiveFormsModule],
})
export class DurationInputComponent implements ControlValueAccessor, OnInit {
  ngControl = inject(NgControl);
  durationControl!: FormControl;

  constructor() {
    this.ngControl.valueAccessor = this;
  }

  ngOnInit(): void {
    this.durationControl = this.ngControl.control! as unknown as FormControl;
    this.durationControl.setValidators([this.validate]);
    this.durationControl.updateValueAndValidity();
  }

  onChange(value: number) {}

  onTouch() {}

  validate(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (value && isNaN(value)) {
      return { invalidNumber: true };
    } else if (!value) {
      return { required: true };
    } else if (value <= 0) {
      return { negativeValue: true };
    }
    return null;
  }

  get isDurationRequired(): boolean {
    return (
      this.durationControl.errors?.['required'] && this.durationControl.touched
    );
  }

  get isInvalidNumber(): boolean {
    return (
      this.durationControl.errors?.['invalidNumber'] &&
      this.durationControl.touched
    );
  }

  get isNegativeNumber(): boolean {
    return (
      this.durationControl.errors?.['negativeValue'] &&
      this.durationControl.touched
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
