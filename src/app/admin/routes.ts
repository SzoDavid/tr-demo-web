import {Routes} from '@angular/router';

export default [
  { path: 'users', loadComponent: () => import('./users/users.component').then(m => m.UsersComponent) },
  { path: 'subjects', loadComponent: () => import('./subjects/subjects.component').then(m => m.SubjectsComponent) },
  { path: 'subjects/:id', loadComponent: () => import('./subjects/subject-detail/subject-detail.component').then(m => m.SubjectDetailComponent) },
  { path: '**', redirectTo: 'users'}
] satisfies Routes;


