import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration',
  standalone: true,
})
export class DurationPipe implements PipeTransform {
  courseDuration: string | undefined = undefined;

  transform(value: number | undefined): string | undefined {
    if (typeof value === 'number') {
      const hours = Math.floor(value / 60);
      const minutes = value % 60;
      if (hours > 0) {
        this.courseDuration = `${hours}h ${minutes}min`;
        return this.courseDuration;
      } else {
        this.courseDuration = `${minutes}min`;
        return this.courseDuration;
      }
    }
    return this.courseDuration;
  }
}
