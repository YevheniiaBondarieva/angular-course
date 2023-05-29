import {
  Directive,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { AuthService } from './../../services/auth.service';
import { Subscription } from 'rxjs';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[ifAuthenticated]',
  standalone: true,
})
export class IfAuthenticatedDirective implements OnInit, OnDestroy {
  private subscription: Subscription | undefined;

  constructor(
    private authService: AuthService,
    private templateRef: TemplateRef<unknown>,
    private vcRef: ViewContainerRef,
  ) {}

  ngOnInit() {
    this.subscription = this.authService.statusChanged.subscribe(
      (authenticated: boolean) => {
        this.updateView(authenticated);
      },
    );
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  @Input() set ifAuthenticated(condition: boolean) {
    this.updateView(this.authService.isAuthenticated() === condition);
  }

  updateView(condition: boolean) {
    if (condition) {
      this.vcRef.createEmbeddedView(this.templateRef);
    } else {
      this.vcRef.clear();
    }
  }
}
