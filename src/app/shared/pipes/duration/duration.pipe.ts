import { Pipe, PipeTransform, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
  name: 'duration',
  standalone: true,
  pure: false,
})
export class DurationPipe implements PipeTransform {
  translateService = inject(TranslateService);
  transform(value: number | undefined): string | undefined {
    if (typeof value === 'number') {
      const hours = Math.floor(value / 60);
      const minutes = value % 60;
      if (hours > 0) {
        return this.translateService.instant('duration.hoursMinutes', {
          hours,
          minutes,
        });
      } else {
        return this.translateService.instant('duration.minutes', {
          minutes,
        });
      }
    }
    return undefined;
  }
}
