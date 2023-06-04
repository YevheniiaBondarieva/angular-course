/* eslint-disable @typescript-eslint/no-explicit-any */
import { TextInputComponent } from './text-input.component';

describe('TextInputComponent', () => {
  let component: TextInputComponent;

  beforeEach(() => {
    component = new TextInputComponent();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit inputValueChange event on input change', () => {
    const inputValue = 'Test value';
    let emittedValue: any;

    component.inputValueChange.subscribe((value: any) => {
      emittedValue = value;
    });
    component.onInputChange({ target: { value: inputValue } });

    expect(emittedValue).toBe(inputValue);
  });
});
