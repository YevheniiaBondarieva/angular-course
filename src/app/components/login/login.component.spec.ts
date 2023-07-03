import { RenderResult, render } from '@testing-library/angular';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { EventEmitter } from '@angular/core';

import LoginComponent from './login.component';
import { User } from '../../shared/models/user.models';
import { UsersApiActions } from '../../store/user/user.actions';

describe('LoginComponent', () => {
  let fixture: RenderResult<LoginComponent>;
  let component: LoginComponent;
  let store: Store;
  const translateService = {
    use: jest.fn(),
    get: jest.fn().mockReturnValue(of()),
    onLangChange: new EventEmitter<LangChangeEvent>(),
    onTranslationChange: new EventEmitter(),
    onDefaultLangChange: new EventEmitter(),
  } as unknown as TranslateService;

  beforeEach(async () => {
    store = {
      dispatch: jest.fn(),
      select: jest.fn(() => of()),
    } as unknown as Store<{
      user: User;
    }>;
    fixture = await render(LoginComponent, {
      providers: [
        { provide: Store, useValue: store },
        { provide: TranslateService, useValue: translateService },
      ],
    });
    component = fixture.fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch login action with the correct payload on login', () => {
    const email = 'test@example.com';
    const password = 'password';
    component.loginForm.setValue({
      email,
      password,
    });
    const expectedAction = UsersApiActions.login({
      payload: { email, password },
    });

    component.onLogin();

    expect(store.dispatch).toHaveBeenCalledWith(expectedAction);
  });

  it('should not call dispatch login action when onLogin is called with empty email and password', () => {
    component.loginForm.setValue({
      email: '',
      password: '',
    });

    component.onLogin();

    expect(store.dispatch).not.toHaveBeenCalled();
  });
});
