import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  Subject,
  Subscription,
  debounceTime,
  distinctUntilChanged,
  filter,
} from 'rxjs';

@Component({
  selector: 'app-section',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss'],
})
export class SectionComponent implements OnInit, OnDestroy {
  @Output() filterCourses = new EventEmitter<string | undefined>();
  private searchSubject = new Subject<string | undefined>();
  router = inject(Router);
  searchValue: string | undefined = undefined;
  private subscription!: Subscription;

  ngOnInit(): void {
    this.subscription = this.searchSubject
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        filter(
          (value) => value === undefined || value.length >= 3 || value === '',
        ),
      )
      .subscribe((value) => {
        this.filterCourses.emit(value);
      });
  }

  onSearchChange(value: string | undefined): void {
    this.searchSubject.next(value || '');
  }

  onAddCourse(): void {
    this.router.navigate(['courses/new']);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
