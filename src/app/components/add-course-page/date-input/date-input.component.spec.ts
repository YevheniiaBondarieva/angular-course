import * as angularCore from '@angular/core';
import { FormControl } from '@angular/forms';

import { DateInputComponent } from './date-input.component';

const injectSpy = jest.spyOn(angularCore, 'inject');

describe('DateInputComponent', () => {
  let component: DateInputComponent;
  const destroyRef = {
    onDestroy: jest.fn(),
  } as unknown as angularCore.DestroyRef;

  beforeEach(() => {
    injectSpy.mockReturnValueOnce(destroyRef);
    component = new DateInputComponent();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Validation', () => {
    it('should validate required field', () => {
      const control = new FormControl('');
      const result = component.validate(control);

      expect(result).toEqual({ required: true });
    });

    it('should validate invalid date format', () => {
      const control = new FormControl('12.34.5678');
      const result = component.validate(control);

      expect(result).toEqual({ invalidDateFormat: true });
    });

    it('should validate valid date format', () => {
      const control = new FormControl('12/31/2022');
      const result = component.validate(control);

      expect(result).toBeNull();
    });
  });

  describe('Value Handling', () => {
    it('should set value', () => {
      const value = '12/31/2022';
      component.onChange = jest.fn();

      component.writeValue(value);

      expect(component.dateControl.value).toEqual('31/12/2022');
    });

    it('should call onTouch when registering touch', () => {
      const onTouchMock = jest.fn();
      component.registerOnTouched(onTouchMock);

      component.onTouch();

      expect(onTouchMock).toHaveBeenCalled();
    });
  });
});
