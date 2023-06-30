import * as angularCore from '@angular/core';
import { NgControl } from '@angular/forms';

import { DurationInputComponent } from './duration-input.component';

const injectSpy = jest.spyOn(angularCore, 'inject');

describe('DurationInputComponent', () => {
  let component: DurationInputComponent;
  const ngControl = jest.fn() as unknown as NgControl;

  beforeEach(() => {
    injectSpy.mockReturnValueOnce(ngControl);
    component = new DurationInputComponent();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Value Handling', () => {
    it('should set value', () => {
      const value = 10;
      component.onChange = jest.fn();

      component.writeValue(value);

      expect(component.onChange).toHaveBeenCalledWith(value);
    });

    it('should call onTouch when registering touch', () => {
      const onTouchMock = jest.fn();
      component.registerOnTouched(onTouchMock);

      component.onTouch();

      expect(onTouchMock).toHaveBeenCalled();
    });

    it('should call onChange when writing a value', () => {
      const onChangeMock = jest.fn();
      component.registerOnChange(onChangeMock);

      const value = 5;
      component.writeValue(value);

      expect(onChangeMock).toHaveBeenCalledWith(value);
    });
  });
});
