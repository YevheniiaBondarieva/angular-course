import { Pipe, PipeTransform, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable, map, of } from 'rxjs';

@Pipe({
  name: 'duration',
  standalone: true,
})
export class DurationPipe implements PipeTransform {
  translateService = inject(TranslateService);
  transform(value: number | undefined): Observable<string | undefined> {
    if (typeof value === 'number') {
      const hours = Math.floor(value / 60);
      const minutes = value % 60;
      if (hours > 0) {
        return this.translateService
          .stream('duration.hoursMinutes')
          .pipe(
            map((translation: string) =>
              translation
                .replace('{{hours}}', `${hours}`)
                .replace('{{minutes}}', `${minutes}`),
            ),
          );
      } else {
        return this.translateService
          .stream('duration.minutes')
          .pipe(
            map((translation: string) =>
              translation.replace('{{minutes}}', `${minutes}`),
            ),
          );
      }
    }
    return of(undefined);
  }
}
