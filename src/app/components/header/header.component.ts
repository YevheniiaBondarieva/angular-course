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

import { LogoComponent } from '../logo/logo.component';
import { AuthService } from '../../shared/services/auth.service';
import { IfAuthenticatedDirective } from '../../shared/directives/if-authenticated/if-authenticated.directive';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, LogoComponent, IfAuthenticatedDirective],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  authService = inject(AuthService);
  router = inject(Router);
  destroyRef = inject(DestroyRef);
  firstName = signal<string | undefined>(undefined);
  lastName = signal<string | undefined>(undefined);
  fullName = computed(() => `${this.firstName()} ${this.lastName()}`);

  ngOnInit(): void {
    this.authService.statusChanged.subscribe((status: boolean) => {
      if (status) {
        this.authService
          .getUserInfo()
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe((response) => {
            this.firstName.set(response.name.first);
            this.lastName.set(response.name.last);
          });
      } else {
        this.firstName.set(undefined);
        this.lastName.set(undefined);
      }
    });

    const status = this.authService.isAuthenticated();
    if (status) {
      this.authService
        .getUserInfo()
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe((response) => {
          this.firstName.set(response.name.first);
          this.lastName.set(response.name.last);
        });
    }
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
