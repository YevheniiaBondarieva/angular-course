import { Pipe, PipeTransform } from '@angular/core';
import { Course } from '../../models/course.models';

@Pipe({
  name: 'filter',
  standalone: true,
  pure: false,
})
export class FilterPipe implements PipeTransform {
  transform(
    coursesItems: Course[],
    filterString: string | undefined,
  ): Course[] {
    if (coursesItems.length === 0 || !filterString) {
      return coursesItems;
    }
    return coursesItems.filter((courseItem: Course) =>
      courseItem.name
        .toLocaleUpperCase()
        .includes(filterString.toLocaleUpperCase()),
    );
  }
}
