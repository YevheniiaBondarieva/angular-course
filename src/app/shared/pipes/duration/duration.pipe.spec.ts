import * as angularCore from '@angular/core';

import { DurationPipe } from './duration.pipe';
import { TranslateService } from '@ngx-translate/core';

const injectSpy = jest.spyOn(angularCore, 'inject');

describe('DurationPipe', () => {
  let pipe: DurationPipe;
  const translateService = {
    instant: jest.fn(),
  };

  beforeEach(() => {
    injectSpy.mockReturnValueOnce(
      translateService as unknown as TranslateService,
    );
    pipe = new DurationPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should transform duration(less than 1h) to "mm min" format', () => {
    const duration = 45;
    translateService.instant.mockReturnValue('45min');
    const transformedValue = pipe.transform(duration);

    expect(transformedValue).toBe('45min');
  });
  it('should transform duration(more than 1h) to "hh h mm min" format', () => {
    const duration = 65;
    translateService.instant.mockReturnValue('1h 5min');
    const transformedValue = pipe.transform(duration);

    expect(transformedValue).toBe('1h 5min');
  });
  it('should return undefined for undefined duration', () => {
    const duration = undefined;
    translateService.instant.mockReturnValue('');
    const transformedValue = pipe.transform(duration);

    expect(transformedValue).toBeUndefined();
  });
});
