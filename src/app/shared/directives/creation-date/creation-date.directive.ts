import { Directive, HostBinding, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appCourseCreationDate]',
  standalone: true,
})
export class CreationDateDirective implements OnInit {
  @Input() creationDate: string | undefined = undefined;
  @HostBinding('style.borderColor') borderColor: string | undefined =
    'transparent';
  colors = {
    green: 'rgb(59, 231, 59)',
    blue: 'rgb(16, 58, 247)',
  };

  private currentDate(): Date {
    return new Date();
  }

  private daysBeforeCurrentDate(days: number): Date {
    const date = new Date('2023-01-01');
    // console.log(date);
    date.setDate(date.getDate() - days);
    // console.log(date.getDate());
    return date;
  }

  ngOnInit(): void {
    if (this.creationDate !== undefined) {
      if (
        new Date(this.creationDate) < this.currentDate() &&
        new Date(this.creationDate) >= this.daysBeforeCurrentDate(14)
      ) {
        this.borderColor = this.colors.green;
      } else if (new Date(this.creationDate) > this.currentDate()) {
        this.borderColor = this.colors.blue;
      }
    }
  }
}
