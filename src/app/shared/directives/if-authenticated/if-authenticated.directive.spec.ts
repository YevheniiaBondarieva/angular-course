/* eslint-disable @typescript-eslint/no-explicit-any */
import { TemplateRef, ViewContainerRef } from '@angular/core';

import { IfAuthenticatedDirective } from './if-authenticated.directive';
import { AuthService } from '../../services/auth.service';

describe('IfAuthenticatedDirective', () => {
  let authService: AuthService;
  let templateRef: TemplateRef<any>;
  let viewContainerRef: ViewContainerRef;
  let directive: IfAuthenticatedDirective;

  beforeEach(() => {
    authService = {
      statusChanged: {
        subscribe: jest.fn(),
      },
      isAuthenticated: jest.fn(),
    } as unknown as AuthService;

    templateRef = {} as TemplateRef<any>;
    viewContainerRef = {
      createEmbeddedView: jest.fn(),
      clear: jest.fn(),
    } as unknown as ViewContainerRef;

    directive = new IfAuthenticatedDirective(
      authService,
      templateRef,
      viewContainerRef,
    );
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should subscribe to authService.statusChanged on ngOnInit', () => {
    const subscribeSpy = jest.spyOn(authService.statusChanged, 'subscribe');

    directive.ngOnInit();

    expect(subscribeSpy).toHaveBeenCalled();
  });

  it('should update view when condition is true', () => {
    const isAuthenticatedSpy = jest
      .spyOn(authService, 'isAuthenticated')
      .mockReturnValue(true);

    directive.ifAuthenticated = true;

    expect(isAuthenticatedSpy).toHaveBeenCalled();
    expect(viewContainerRef.createEmbeddedView).toHaveBeenCalledWith(
      templateRef,
    );
  });

  it('should update view when condition is false', () => {
    directive.ifAuthenticated = false;

    expect(viewContainerRef.clear).toHaveBeenCalled();
  });
});
