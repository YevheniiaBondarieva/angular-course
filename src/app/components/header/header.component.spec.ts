import { RenderResult, render } from '@testing-library/angular';
import { HttpClient } from '@angular/common/http';

import { AuthService } from '../../shared/services/auth.service';
import { HeaderComponent } from './header.component';
import { IfAuthenticatedDirective } from '../../shared/directives/if-authenticated/if-authenticated.directive';

describe('HeaderComponent', () => {
  let fixture: RenderResult<HeaderComponent>;
  let component: HeaderComponent;
  let authService: AuthService;

  beforeEach(async () => {
    fixture = await render(HeaderComponent, {
      imports: [IfAuthenticatedDirective],
      providers: [AuthService, { provide: HttpClient, useValue: {} }],
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

  it('should call authService.logout() on onLogout', () => {
    jest.spyOn(authService, 'logout');

    component.onLogout();

    expect(authService.logout).toHaveBeenCalled();
  });
});
