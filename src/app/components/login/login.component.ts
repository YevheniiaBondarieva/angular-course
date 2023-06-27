import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { LoadingBlockService } from '../../shared/services/loading-block.service';
import { UsersApiActions } from '../../store/user/user.actions';
import { User } from '../../shared/models/user.models';
import { UserSelectors } from '../../store/selectors';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export default class LoginComponent implements OnInit {
  loadingBlockService = inject(LoadingBlockService);
  private store = inject(Store<{ user: User }>);
  destroyRef = inject(DestroyRef);
  loginForm!: FormGroup;
  loginError = false;

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.store.dispatch(
        UsersApiActions.login({
          payload: { email, password },
        }),
      );
      this.store
        .select(UserSelectors.selectErrorMessage)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe((errorMessage) => {
          if (errorMessage.includes('401 Unauthorized')) {
            this.loginError = true;
          }
        });
    }
  }
}
