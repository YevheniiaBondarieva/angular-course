import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { LogoComponent } from '../logo/logo.component';
import { AuthService } from '../../shared/services/auth.service';
import { IfAuthenticatedDirective } from '../../shared/directives/if-authenticated/if-authenticated.directive';
import { LoadingBlockService } from '../../shared/services/loading-block.service';
import { LoadingBlockComponent } from '../loading-block/loading-block.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    LogoComponent,
    IfAuthenticatedDirective,
    LoadingBlockComponent,
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [LoadingBlockService],
})
export class HeaderComponent implements OnInit {
  authService = inject(AuthService);
  router = inject(Router);
  loadingBlockService = inject(LoadingBlockService);
  userInfo: string | undefined;

  ngOnInit(): void {
    this.authService.statusChanged.subscribe((status: boolean) => {
      if (status) {
        this.loadingBlockService.show = true;
        this.authService.getUserInfo().subscribe((response) => {
          this.userInfo = response;
          this.loadingBlockService.show = false;
        });
      } else {
        this.userInfo = undefined;
        this.loadingBlockService.show = false;
      }
    });

    const status = this.authService.isAuthenticated();
    if (status) {
      this.loadingBlockService.show = true;
      this.authService.getUserInfo().subscribe((response) => {
        this.userInfo = response;
        this.loadingBlockService.show = false;
      });
    }
  }

  onLogout() {
    this.loadingBlockService.show = true;
    this.authService.logout();
    this.loadingBlockService.show = false;
    this.router.navigate(['/login']);
  }
}
