import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

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
export class HeaderComponent {
  authService = inject(AuthService);

  onLogout() {
    this.authService.logout();
  }
}
