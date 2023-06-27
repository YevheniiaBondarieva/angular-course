import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';

import { LoadingBlockService } from '../../shared/services/loading-block.service';
import { UsersApiActions } from '../../store/user/user.actions';
import { User } from '../../shared/models/user.models';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export default class LoginComponent {
  loadingBlockService = inject(LoadingBlockService);
  private store = inject(Store<{ user: User }>);
  email = '';
  password = '';

  onLogin() {
    if (this.email && this.password) {
      this.store.dispatch(
        UsersApiActions.login({
          payload: { email: this.email, password: this.password },
        }),
      );
    }
  }
}
