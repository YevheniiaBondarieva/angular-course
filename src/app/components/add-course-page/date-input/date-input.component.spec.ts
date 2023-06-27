import { FormControl } from '@angular/forms';

import { DateInputComponent } from './date-input.component';

describe('DateInputComponent', () => {
  let component: DateInputComponent;

  beforeEach(() => {
    component = new DateInputComponent();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

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

  it('should set value', () => {
    const value = '12/31/2022';
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

    const value = '12/31/2021';
    component.writeValue(value);

    expect(onChangeMock).toHaveBeenCalledWith(value);
  });
});
