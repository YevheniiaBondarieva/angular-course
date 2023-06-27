import { FormControl } from '@angular/forms';

import { DurationInputComponent } from './duration-input.component';

describe('TextInputComponent', () => {
  let component: DurationInputComponent;

  beforeEach(() => {
    component = new DurationInputComponent();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should validate required field', () => {
    const control = new FormControl('');
    const result = component.validate(control);

    expect(result).toEqual({ required: true });
  });

  it('should validate invalid number format', () => {
    const control = new FormControl('abc');
    const result = component.validate(control);

    expect(result).toEqual({ invalidNumber: true });
  });

  it('should validate negative value', () => {
    const control = new FormControl(-10);
    const result = component.validate(control);

    expect(result).toEqual({ negativeValue: true });
  });

  it('should validate valid value', () => {
    const control = new FormControl(10);
    const result = component.validate(control);

    expect(result).toBeNull();
  });

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
