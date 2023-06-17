import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AuthService } from '../../shared/services/auth.service';
import { LoadingBlockService } from '../../shared/services/loading-block.service';
import { LoadingBlockComponent } from '../loading-block/loading-block.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, LoadingBlockComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [LoadingBlockService],
})
export default class LoginComponent {
  authService = inject(AuthService);
  loadingBlockService = inject(LoadingBlockService);
  status!: boolean;
  email = '';
  password = '';

  onLogin() {
    if (this.email && this.password) {
      this.loadingBlockService.show = true;
      this.authService.login(this.email, this.password).subscribe();
      this.loadingBlockService.show = false;
    }
  }
}
