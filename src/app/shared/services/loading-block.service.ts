import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingBlockService {
  show = new BehaviorSubject<boolean>(false);

  showLoading(): void {
    this.show.next(true);
  }

  hideLoading(): void {
    this.show.next(false);
  }
}
