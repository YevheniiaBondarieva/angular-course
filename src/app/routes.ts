import { Route } from '@angular/router';

import { CoursesListItemComponent } from './components/courses/courses-list-item/courses-list-item.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';

export const routes: Route[] = [
  {
    path: '',
    component: HeaderComponent,
  },
  {
    path: ':id',
    component: CoursesListItemComponent,
  }
];
