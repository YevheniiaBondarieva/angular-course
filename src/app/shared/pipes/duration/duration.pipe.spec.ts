import { DurationPipe } from './duration.pipe';

describe('DurationPipe', () => {
  let pipe: DurationPipe;

  beforeEach(() => {
    pipe = new DurationPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should transform duration(less than 1h) to "mm min" format', () => {
    const duration = 45;
    const transformedValue = pipe.transform(duration);

    expect(transformedValue).toBe('45min');
  });
  it('should transform duration(more than 1h) to "hh h mm min" format', () => {
    const duration = 65;
    const transformedValue = pipe.transform(duration);

    expect(transformedValue).toBe('1h 5min');
  });
  it('should return undefined for undefined duration', () => {
    const duration = undefined;
    const transformedValue = pipe.transform(duration);

    expect(transformedValue).toBeUndefined();
  });
});
