import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, finalize } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingBlockService {
  private showSubject = new BehaviorSubject<boolean>(false);
  show$: Observable<boolean> = this.showSubject.asObservable();

  showLoading(): void {
    this.showSubject.next(true);
  }

  hideLoading(): void {
    this.showSubject.next(false);
  }

  wrapWithLoader<T>(observable: Observable<T>): Observable<T> {
    this.showLoading();
    return observable.pipe(finalize(() => this.hideLoading()));
  }
}
