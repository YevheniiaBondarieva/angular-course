import { RenderResult, fireEvent, render } from '@testing-library/angular';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import {
  LangChangeEvent,
  TranslateModule,
  TranslateService,
} from '@ngx-translate/core';
import { EventEmitter } from '@angular/core';

import { AuthService } from '../../shared/services/auth.service';
import { HeaderComponent } from './header.component';
import { IfAuthenticatedDirective } from '../../shared/directives/if-authenticated/if-authenticated.directive';
import { User } from '../../shared/models/user.models';
import { UsersApiActions } from '../../store/user/user.actions';

describe('HeaderComponent', () => {
  let fixture: RenderResult<HeaderComponent>;
  let component: HeaderComponent;
  let authService: AuthService;
  const store = {
    dispatch: jest.fn(),
    select: jest.fn(),
  } as unknown as Store<{
    user: User;
  }>;
  const translateService = {
    use: jest.fn(),
    get: jest.fn().mockReturnValue(of()),
    onLangChange: new EventEmitter<LangChangeEvent>(),
    onTranslationChange: new EventEmitter(),
    onDefaultLangChange: new EventEmitter(),
  } as unknown as TranslateService;

  beforeEach(async () => {
    fixture = await render(HeaderComponent, {
      imports: [IfAuthenticatedDirective, TranslateModule],
      providers: [
        AuthService,
        { provide: HttpClient, useValue: {} },
        { provide: TranslateService, useValue: translateService },
        {
          provide: Store<{
            user: User;
          }>,
          useValue: store,
        },
      ],
    });
    component = fixture.fixture.componentInstance;
    authService = fixture.fixture.componentRef.injector.get(AuthService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('should render', () => {
    it('the LogoComponent', () => {
      const LogoComponent = fixture.container.querySelector('app-logo');

      expect(LogoComponent).toBeTruthy();
    });

    it('no placeholder with user login when user is not authenticated', () => {
      jest.spyOn(authService, 'isAuthenticated').mockReturnValue(false);
      fixture.detectChanges();
      const link = fixture.container.querySelector('li.list-item a.link');

      expect(link).toBeFalsy();
    });

    it('no log off button when user is not authenticated', () => {
      jest.spyOn(authService, 'isAuthenticated').mockReturnValue(false);
      fixture.detectChanges();
      const button = fixture.container.querySelector(
        'li.list-item button.log-off',
      );

      expect(button).toBeFalsy();
    });
  });

  it('should dispatch logout action', () => {
    jest.spyOn(store, 'dispatch');

    component.onLogout();

    expect(store.dispatch).toHaveBeenCalledWith(UsersApiActions.logout());
  });

  it('should set first name and last name when authenticated', () => {
    const mockResponse = { first: 'firstName', last: 'lastName' };
    const fullName = 'firstName lastName';
    jest.spyOn(authService, 'isAuthenticated').mockReturnValue(true);
    jest
      .spyOn(authService.statusChanged, 'subscribe')
      .mockImplementation((callback) => {
        return callback(true);
      });
    jest.spyOn(store, 'select').mockReturnValue(of(mockResponse));

    component.ngOnInit();

    expect(component.fullName()).toEqual(fullName);
  });

  it('should set userInfo to undefined when status is false', () => {
    jest
      .spyOn(authService.statusChanged, 'subscribe')
      .mockImplementation((callback) => {
        return callback(false);
      });

    component.ngOnInit();

    expect(component.fullName()).toEqual('undefined undefined');
  });

  it('should call authService.isAuthenticated()', () => {
    jest.spyOn(authService, 'isAuthenticated');

    component.ngOnInit();

    expect(authService.isAuthenticated).toHaveBeenCalled();
  });

  it('should set userInfo to undefined when status is true and getUserInfo() returns an error', () => {
    jest.spyOn(authService, 'isAuthenticated').mockReturnValue(true);
    jest.spyOn(store, 'select').mockReturnValue(of(null));

    component.ngOnInit();

    expect(component.fullName()).toEqual('undefined undefined');
  });

  it('should change language', () => {
    jest.spyOn(translateService, 'use');

    const selectElement = fixture.container.querySelector(
      '.select-language',
    ) as Element;
    fireEvent.change(selectElement, {
      target: { value: 'en' },
    });

    expect(translateService.use).toHaveBeenCalledWith('en');
  });
});
