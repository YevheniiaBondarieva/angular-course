import { Routes } from '@angular/router';

import { authGuard } from './shared/services/auth-guard.service';

export const routes: Routes = [
  { path: '', redirectTo: '/courses', pathMatch: 'full' },
  {
    path: 'courses',
    loadComponent: () =>
      import('./components/courses-page/courses-page.component'),
    canActivate: [authGuard],
  },
  {
    path: 'courses/new',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./components/add-course-page/add-course-page.component'),
  },
  {
    path: 'courses/:id',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./components/add-course-page/add-course-page.component'),
  },
  {
    path: 'login',
    loadComponent: () => import('./components/login/login.component'),
  },
  {
    path: '404',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./components/not-found-page/not-found-page.component'),
  },
  { path: '**', redirectTo: '/404' },
];
