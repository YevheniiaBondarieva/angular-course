import { AbstractControl, FormArray, FormControl } from '@angular/forms';

import { AuthorsInputComponent } from './authors-input.component';
import { Author } from '../../../shared/models/author.models';

describe('AuthorsInputComponent', () => {
  let component: AuthorsInputComponent;
  let savedAuthors: FormArray;
  let allAuthors: Author[];

  beforeEach(() => {
    savedAuthors = new FormArray([]) as unknown as FormArray;
    allAuthors = [
      { id: 1, name: 'John', lastName: 'Doe' },
      { id: 2, name: 'Jane', lastName: 'Smith' },
      { id: 3, name: 'Bob', lastName: 'Johnson' },
    ];

    component = new AuthorsInputComponent();
    component.savedAuthors = savedAuthors;
    component.allAuthors = allAuthors;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Validation', () => {
    it('should validate when there are no authors', () => {
      const control = { value: new FormArray([]) } as AbstractControl;
      const result = component.validate(control);

      expect(result).toEqual({ noAuthors: true });
    });

    it('should not validate when there are authors', () => {
      const control = { value: new FormArray([new FormControl()]) };
      const result = component.validate(control as AbstractControl);

      expect(result).toBeNull();
    });
  });

  describe('Adding and Removing Authors', () => {
    it('should add an author to the saved authors', () => {
      const author = { id: 1, name: 'John', lastName: 'Doe' };
      component.savedAuthors = new FormArray([]) as unknown as FormArray;

      component.addAuthor(author);

      expect(component.savedAuthors.length).toBe(1);
    });

    it('should remove an author from the saved authors', () => {
      const author1 = { id: 1, name: 'John', lastName: 'Doe' } as Author;
      const author2 = { id: 2, name: 'Jane', lastName: 'Smith' } as Author;
      component.savedAuthors = new FormArray([
        new FormControl(author1, { nonNullable: true }),
        new FormControl(author2, { nonNullable: true }),
      ]);

      component.removeAuthor(0);

      expect(component.savedAuthors.length).toBe(1);
    });
  });

  describe('Filtering Authors', () => {
    it('should filter authors based on the search term', () => {
      const authors = [
        { id: 1, name: 'John', lastName: 'Doe' },
        { id: 2, name: 'Jane', lastName: 'Smith' },
        { id: 3, name: 'Bob', lastName: 'Johnson' },
      ];
      component.allAuthors = authors;

      component.onAuthorSearch({ target: { value: 'Jo' } } as unknown as Event);

      expect(component.filteredAuthors.length).toBe(2);
    });

    it('should not filter authors when the search term is empty', () => {
      const authors = [
        { id: 1, name: 'John', lastName: 'Doe' },
        { id: 2, name: 'Jane', lastName: 'Smith' },
        { id: 3, name: 'Bob', lastName: 'Johnson' },
      ];
      component.allAuthors = authors;

      component.onAuthorSearch({ target: { value: '' } } as unknown as Event);

      expect(component.filteredAuthors.length).toBe(0);
    });
  });

  describe('Form Control Interaction', () => {
    it('should call markAsTouched when an author is added', () => {
      component.markAsTouched = jest.fn();
      const author = { id: 1, name: 'John', lastName: 'Doe' };

      component.addAuthor(author);

      expect(component.markAsTouched).toHaveBeenCalled();
    });

    it('should call markAsTouched when an author is removed', () => {
      component.markAsTouched = jest.fn();

      component.removeAuthor(0);

      expect(component.markAsTouched).toHaveBeenCalled();
    });

    it('should call onTouch when markAsTouched is called for the first time', () => {
      component.onTouch = jest.fn();

      component.markAsTouched();

      expect(component.onTouch).toHaveBeenCalled();
    });
  });
});
