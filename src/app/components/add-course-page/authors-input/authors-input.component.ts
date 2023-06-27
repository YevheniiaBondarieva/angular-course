/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Component, Input, forwardRef } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormArray,
  FormControl,
  FormsModule,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  ValidationErrors,
  Validator,
} from '@angular/forms';

import { Author } from '../../../shared/models/author.models';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-authors-input',
  templateUrl: './authors-input.component.html',
  styleUrls: ['./authors-input.component.scss'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AuthorsInputComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: forwardRef(() => AuthorsInputComponent),
    },
  ],
})
export class AuthorsInputComponent implements ControlValueAccessor, Validator {
  @Input({ required: true }) savedAuthors!: FormArray;
  @Input() allAuthors!: Author[] | [];
  filteredAuthors: Author[] = [];
  searchTerm = '';

  onChange(value: string) {}

  onTouch() {}

  touched = false;

  get selectedAuthors() {
    return (<FormArray>this.savedAuthors).controls;
  }

  validate(control: AbstractControl): ValidationErrors | null {
    const authors = control.value as FormArray;
    if (authors.length === 0) {
      return { noAuthors: true };
    }
    return null;
  }

  writeValue(authors: any): void {
    this.onChange(authors);
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouch = fn;
  }

  onAuthorSearch(event: Event): void {
    this.markAsTouched();
    this.searchTerm = (event.target as HTMLInputElement).value;
    this.filteredAuthors = this.allAuthors
      .filter((author) => this.isAuthorMatch(author, this.searchTerm))
      .filter(
        (author, index, self) =>
          index === self.findIndex((a) => a.id === author.id),
      );
  }

  isAuthorMatch(author: Author, searchTerm: string): boolean {
    const fullName = `${author.name} ${author.lastName}`.toLowerCase();
    if (!searchTerm) {
      return false;
    }
    return fullName.includes(searchTerm.toLowerCase());
  }

  addAuthor(author: Author): void {
    this.markAsTouched();
    const authorControl = new FormControl(author);
    this.savedAuthors.push(authorControl);
  }

  removeAuthor(index: number) {
    this.markAsTouched();
    this.savedAuthors.removeAt(index);
  }

  markAsTouched() {
    if (!this.touched) {
      this.onTouch();
      this.touched = true;
    }
  }
}
