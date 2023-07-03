import * as angularCore from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';

import { DurationPipe } from './duration.pipe';

const injectSpy = jest.spyOn(angularCore, 'inject');

describe('DurationPipe', () => {
  let pipe: DurationPipe;
  const translateService = {
    instant: jest.fn(),
    stream: jest.fn(),
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

  it('should transform duration(less than 1h) to "mm min" format', (done) => {
    const duration = 45;
    translateService.stream.mockReturnValue(of('45min'));

    pipe.transform(duration).subscribe((transformedValue) => {
      expect(transformedValue).toBe('45min');
      done();
    });
  });
  it('should transform duration(more than 1h) to "hh h mm min" format', (done) => {
    const duration = 65;
    translateService.stream.mockReturnValue(of('1h 5min'));

    pipe.transform(duration).subscribe((transformedValue) => {
      expect(transformedValue).toBe('1h 5min');
      done();
    });
  });
  it('should return undefined for undefined duration', (done) => {
    const duration = undefined;
    translateService.stream.mockReturnValue(of(''));

    pipe.transform(duration).subscribe((transformedValue) => {
      expect(transformedValue).toBeUndefined();
      done();
    });
  });
});
