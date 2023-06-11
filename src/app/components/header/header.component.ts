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
    this.userInfo = this.authService.getUserInfo()?.email;
  }

  onLogout(): void {
    this.authService.logout();
    void this.router.navigate(['/login']);
  }
}
