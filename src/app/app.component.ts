import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

import { CoursesPageComponent } from './components/courses-page/courses-page.component';
import { FooterComponent } from './components/footer/footer.component';
import { AuthService } from './shared/services/auth.service';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { IfAuthenticatedDirective } from './shared/directives/if-authenticated/if-authenticated.directive';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    CoursesPageComponent,
    FooterComponent,
    HeaderComponent,
    LoginComponent,
    BreadcrumbsComponent,
    IfAuthenticatedDirective,
  ],
  providers: [AuthService],
})
export class AppComponent {}
