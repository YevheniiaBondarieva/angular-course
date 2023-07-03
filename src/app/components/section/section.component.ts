import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  EventEmitter,
  OnInit,
  Output,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import {
  Subject,
  Subscription,
  debounceTime,
  distinctUntilChanged,
  filter,
} from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-section',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, TranslateModule],
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionComponent implements OnInit {
  @Output() filterCourses = new EventEmitter<string | undefined>();
  private searchSubject = new Subject<string | undefined>();
  destroyRef = inject(DestroyRef);
  router = inject(Router);
  private subscription!: Subscription;
  searchForm!: FormGroup;

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      search: new FormControl(''),
    });

    this.subscription = this.searchSubject
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        filter((value) => !value?.length || value.length >= 3),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((value) => {
        this.filterCourses.emit(value);
      });
  }

  onSearchChange(): void {
    const value = this.searchForm.get('search')?.value;
    this.searchSubject.next(value || '');
  }

  onAddCourse(): void {
    this.router.navigate(['courses/new']);
  }
}
