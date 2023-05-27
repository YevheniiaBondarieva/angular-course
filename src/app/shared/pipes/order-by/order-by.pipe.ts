import { Pipe, PipeTransform } from '@angular/core';
import { Course } from '../../models/course.models';

@Pipe({
  name: 'orderBy',
  standalone: true,
  pure: false,
})
export class OrderByPipe implements PipeTransform {
  transform(coursesItems: Course[]): Course[] {
    const sortedCourses = [...coursesItems];
    return sortedCourses.sort((a: Course, b: Course) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  }
}
