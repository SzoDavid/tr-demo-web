import {Route} from '@angular/router';
import {accountGuard} from "./shared/guards/account.guard";
import {authGuard} from "./shared/guards/auth.guard";
import {roleGuard} from "./shared/guards/role.guard";

export const ROUTES: Route[] = [
  {
    path: 'admin',
    loadChildren: () => import('./admin/routes'),
    canActivateChild: [roleGuard],
    data: { role: 'ROLE_ADMIN' }
  },
  {
    path: 'student',
    loadChildren: () => import('./student/routes'),
    canActivateChild: [roleGuard],
    data: { role: 'ROLE_STUDENT' }
  },
  {
    path: 'teacher',
    loadChildren: () => import('./teacher/routes'),
    canActivateChild: [roleGuard],
    data: { role: 'ROLE_TEACHER' }
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.component').then(m => m.ProfileComponent),
    canActivate: [authGuard]
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent),
    canActivate: [accountGuard]
  },
  { path: 'not-found',
    loadComponent: () => import('./pages/not-found/not-found.component').then(m => m.NotFoundComponent)
  },
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent),
  },
  {
    path: '**',
    redirectTo: 'not-found'
  }
];
