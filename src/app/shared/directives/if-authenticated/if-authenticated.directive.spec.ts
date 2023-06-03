/* eslint-disable @typescript-eslint/no-explicit-any */
import { EventEmitter, TemplateRef, ViewContainerRef } from '@angular/core';
import * as angularCore from '@angular/core';

import { IfAuthenticatedDirective } from './if-authenticated.directive';
import { AuthService } from '../../services/auth.service';

describe('IfAuthenticatedDirective', () => {
  let authService: AuthService;
  let templateRef: TemplateRef<any>;
  let viewContainerRef: ViewContainerRef;
  let directive: IfAuthenticatedDirective;

  beforeEach(() => {
    const injectSpy = jest.spyOn(angularCore, 'inject');
    authService = {
      isAuthenticated: () => true,
      statusChanged: new EventEmitter<boolean>(),
      login: jest.fn(),
      logout: jest.fn(),
      getUserInfo: jest.fn(),
    } as AuthService;
    templateRef = {} as TemplateRef<any>;
    viewContainerRef = {
      createEmbeddedView: jest.fn(),
      clear: jest.fn(),
    } as unknown as ViewContainerRef;

    injectSpy.mockReturnValueOnce(authService);
    injectSpy.mockReturnValueOnce(templateRef);
    injectSpy.mockReturnValueOnce(viewContainerRef);

    directive = new IfAuthenticatedDirective();
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
    directive.ifAuthenticated = true;

    expect(viewContainerRef.createEmbeddedView).toHaveBeenCalledWith(
      templateRef,
    );
  });

  it('should update view when condition is false', () => {
    directive.ifAuthenticated = false;

    expect(viewContainerRef.clear).toHaveBeenCalled();
  });
});
