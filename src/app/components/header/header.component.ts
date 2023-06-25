import {
  Component,
  DestroyRef,
  OnInit,
  computed,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';

import { LogoComponent } from '../logo/logo.component';
import { AuthService } from '../../shared/services/auth.service';
import { IfAuthenticatedDirective } from '../../shared/directives/if-authenticated/if-authenticated.directive';
import { User } from '../../shared/models/user.models';
import { UsersApiActions } from '../../store/user/user.actions';
import { UserSelectors } from '../../store/selectors';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, LogoComponent, IfAuthenticatedDirective],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  authService = inject(AuthService);
  private store = inject(Store<{ user: User }>);
  router = inject(Router);
  destroyRef = inject(DestroyRef);
  firstName = signal<string | undefined>(undefined);
  lastName = signal<string | undefined>(undefined);
  fullName = computed(() => `${this.firstName()} ${this.lastName()}`);

  ngOnInit(): void {
    this.authService.statusChanged.subscribe((status: boolean) => {
      if (status) {
        this.store.dispatch(UsersApiActions.getCurrentUser());
        this.store
          .select(UserSelectors.selectUserName)
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe((user) => {
            this.firstName.set(user?.first);
            this.lastName.set(user?.last);
          });
      } else {
        this.firstName.set(undefined);
        this.lastName.set(undefined);
      }
    });

    const status = this.authService.isAuthenticated();
    if (status) {
      this.store.dispatch(UsersApiActions.getCurrentUser());
      this.store
        .select(UserSelectors.selectUserName)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe((user) => {
          this.firstName.set(user?.first);
          this.lastName.set(user?.last);
        });
    }
  }

  onLogout() {
    this.store.dispatch(UsersApiActions.logout());
    this.router.navigate(['/login']);
  }
}
