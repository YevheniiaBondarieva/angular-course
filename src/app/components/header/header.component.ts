import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { LogoComponent } from '../logo/logo.component';
import { AuthService } from '../../shared/services/auth.service';
import { IfAuthenticatedDirective } from '../../shared/directives/if-authenticated/if-authenticated.directive';

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
  userInfo: string | undefined;

  ngOnInit(): void {
    this.authService.statusChanged.subscribe((status: boolean) => {
      if (status) {
        this.authService.getUserInfo().subscribe((response) => {
          this.userInfo = response;
        });
      } else {
        this.userInfo = undefined;
      }
    });

    const status = this.authService.isAuthenticated();
    if (status) {
      this.authService.getUserInfo().subscribe((response) => {
        this.userInfo = response;
      });
    }
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
