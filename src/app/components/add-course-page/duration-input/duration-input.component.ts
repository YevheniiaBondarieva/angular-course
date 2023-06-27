/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import { CommonModule } from '@angular/common';
import { Component, Input, forwardRef } from '@angular/core';
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

import { DurationPipe } from '../../../shared/pipes/duration/duration.pipe';

@Component({
  standalone: true,
  selector: 'app-duration-input',
  templateUrl: './duration-input.component.html',
  styleUrls: ['./duration-input.component.scss'],
  imports: [CommonModule, FormsModule, DurationPipe, ReactiveFormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DurationInputComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: forwardRef(() => DurationInputComponent),
    },
  ],
})
export class DurationInputComponent implements ControlValueAccessor, Validator {
  @Input({ required: true }) formControl!: FormControl;

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

  writeValue(obj: number): void {
    this.onChange(obj);
  }

  registerOnChange(fn: (value: number) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouch = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    isDisabled ? this.formControl.disable() : this.formControl.enable();
  }
}
