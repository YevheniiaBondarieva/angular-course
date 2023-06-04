import {
  Directive,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewContainerRef,
  inject,
} from '@angular/core';

import { AuthService } from './../../services/auth.service';
import { Subscription } from 'rxjs';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[ifAuthenticated]',
  standalone: true,
})
export class IfAuthenticatedDirective implements OnInit, OnDestroy {
  @Input() set ifAuthenticated(authenticated: boolean) {
    this.value = authenticated;
    this.updateView();
  }
  authService = inject(AuthService);
  templateRef = inject(TemplateRef<unknown>);
  vcRef = inject(ViewContainerRef);
  value: boolean | undefined;
  status: boolean = this.authService.isAuthenticated();
  private subscription: Subscription | undefined;

  ngOnInit() {
    this.subscription = this.authService.statusChanged.subscribe(
      (authenticated: boolean) => {
        this.status = authenticated;
        this.updateView();
      },
    );
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  updateView() {
    this.vcRef.clear();
    if (this.value === this.status) {
      this.vcRef.createEmbeddedView(this.templateRef);
    }
  }
}
