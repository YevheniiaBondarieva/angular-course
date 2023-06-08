import { Routes } from '@angular/router';

import { AuthGuard } from './shared/services/auth-guard.service';

export const routes: Routes = [
  { path: '', redirectTo: '/courses', pathMatch: 'full' },
  {
    path: 'courses',
    loadComponent: async () =>
      (await import('./components/courses-page/courses-page.component'))
        .CoursesPageComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadComponent: async () =>
          (await import('./components/breadcrumbs/breadcrumbs.component'))
            .BreadcrumbsComponent,
      },
    ],
  },
  {
    path: 'courses/new',
    canActivate: [AuthGuard],
    loadComponent: async () =>
      (await import('./components/add-course-page/add-course-page.component'))
        .AddCoursePageComponent,
    children: [
      {
        path: '',
        loadComponent: async () =>
          (await import('./components/breadcrumbs/breadcrumbs.component'))
            .BreadcrumbsComponent,
      },
    ],
  },
  {
    path: 'courses/:id',
    canActivate: [AuthGuard],
    loadComponent: async () =>
      (await import('./components/add-course-page/add-course-page.component'))
        .AddCoursePageComponent,
    children: [
      {
        path: '',
        loadComponent: async () =>
          (await import('./components/breadcrumbs/breadcrumbs.component'))
            .BreadcrumbsComponent,
      },
    ],
  },
  {
    path: 'login',
    loadComponent: async () =>
      (await import('./components/login/login.component')).LoginComponent,
  },
  {
    path: '404',
    canActivate: [AuthGuard],
    loadComponent: async () =>
      (await import('./components/not-found-page/not-found-page.component'))
        .NotFoundPageComponent,
    children: [
      {
        path: '',
        loadComponent: async () =>
          (await import('./components/breadcrumbs/breadcrumbs.component'))
            .BreadcrumbsComponent,
      },
    ],
  },
  { path: '**', redirectTo: '/404' },
];
