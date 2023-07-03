import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import {
  LangChangeEvent,
  TranslateModule,
  TranslateService,
} from '@ngx-translate/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { Course } from '../../../shared/models/course.models';
import { CreationDateDirective } from '../../../shared/directives/creation-date/creation-date.directive';
import { DurationPipe } from '../../../shared/pipes/duration/duration.pipe';

@Component({
  selector: 'app-courses-list-item',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, CreationDateDirective, DurationPipe, TranslateModule],
  templateUrl: './courses-list-item.component.html',
  styleUrls: ['./courses-list-item.component.scss'],
})
export class CoursesListItemComponent implements OnInit {
  @Input() courseItem: Course | undefined = undefined;
  @Output() deleteCourse: EventEmitter<string | number> = new EventEmitter<
    string | number
  >();
  @Output() editCourse: EventEmitter<string | number> = new EventEmitter<
    string | number
  >();
  router = inject(Router);
  route = inject(ActivatedRoute);
  translateService = inject(TranslateService);
  destroyRef = inject(DestroyRef);
  locale!: string;

  ngOnInit(): void {
    this.locale = this.translateService.currentLang;
    this.translateService.onLangChange
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((langChangeEvent: LangChangeEvent) => {
        this.locale = langChangeEvent.lang;
      });
  }

  onDeleteCouse(id: string | number | undefined): void {
    if (id === undefined) return;
    this.deleteCourse.emit(id);
  }

  onEditCourse(id: string | number | undefined): void {
    if (id === undefined) return;
    this.editCourse.emit(id);
  }
}
