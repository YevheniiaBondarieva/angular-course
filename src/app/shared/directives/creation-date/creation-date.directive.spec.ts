/* eslint-disable @typescript-eslint/no-explicit-any */
import { CreationDateDirective } from './creation-date.directive';

describe('CreationDateDirective', () => {
  let directive: CreationDateDirective;

  beforeEach(() => {
    directive = new CreationDateDirective();
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should set borderColor to green when creationDate is within 14 days before current date', () => {
    const currentDate = new Date('2023-05-25');
    const creationDate = new Date('2023-05-20');
    // Ми використовуємо jest.spyOn для заміни реалізації методу currentDate() замокованим значенням.
    // ми використовуємо directive as any для уникнення помилки типізації, оскільки currentDate є приватним методом.
    jest.spyOn(directive as any, 'currentDate').mockReturnValue(currentDate);
    directive.creationDate = creationDate.toISOString();
    directive.ngOnInit();
    expect(directive.borderColor).toBe('rgb(59, 231, 59)');
  });

  it('should set borderColor to blue when creationDate is after the current date', () => {
    const currentDate = new Date('2023-05-25');
    const creationDate = new Date('2023-05-30');
    jest.spyOn(directive as any, 'currentDate').mockReturnValue(currentDate);
    directive.creationDate = creationDate.toISOString();
    directive.ngOnInit();
    expect(directive.borderColor).toBe('rgb(16, 58, 247)');
  });

  it('should not set borderColor when creationDate is undefined', () => {
    directive.creationDate = undefined;
    directive.ngOnInit();
    expect(directive.borderColor).toBe('transparent');
  });
});
