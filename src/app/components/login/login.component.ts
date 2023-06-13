import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export default class LoginComponent {
  authService = inject(AuthService);
  status!: boolean;
  email = '';
  password = '';

  onLogin() {
    if (this.email && this.password) {
      this.authService.login(this.email, this.password);
    }
  }
}
