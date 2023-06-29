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
import { Observable, map } from 'rxjs';

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
  loginError$!: Observable<boolean>;

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });

    this.loginError$ = this.store
      .select(UserSelectors.selectErrorMessage)
      .pipe(map((errorMessage) => errorMessage.includes('401 Unauthorized')));
  }

  get isEmailRequired(): boolean {
    const emailControl = this.loginForm.get('email');
    return emailControl?.errors?.['required'] && emailControl.touched;
  }

  get isPasswordRequired(): boolean {
    const passwordControl = this.loginForm.get('password');
    return passwordControl?.errors?.['required'] && passwordControl.touched;
  }

  onLogin() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.store.dispatch(
        UsersApiActions.login({
          payload: { email, password },
        }),
      );
      // this.store
      //   .select(UserSelectors.selectErrorMessage)
      //   .pipe(takeUntilDestroyed(this.destroyRef))
      //   .subscribe((errorMessage) => {
      //     if (errorMessage.includes('401 Unauthorized')) {
      //       this.loginError = true;
      //     }
      //   });
    }
  }
}
