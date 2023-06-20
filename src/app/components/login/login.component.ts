import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { finalize, take } from 'rxjs/operators';

import { AuthService } from '../../shared/services/auth.service';
import { LoadingBlockService } from '../../shared/services/loading-block.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export default class LoginComponent {
  authService = inject(AuthService);
  loadingBlockService = inject(LoadingBlockService);
  email = '';
  password = '';

  onLogin() {
    if (this.email && this.password) {
      this.loadingBlockService.showLoading();
      this.authService
        .login(this.email, this.password)
        .pipe(
          take(1),
          finalize(() => {
            this.loadingBlockService.hideLoading();
          }),
        )
        .subscribe();
    }
  }
}
