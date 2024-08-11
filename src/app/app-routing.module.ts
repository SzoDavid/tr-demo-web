import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {accountGuard} from "./guards/account.guard";
import {authGuard} from "./guards/auth.guard";

const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () => import('./pages/admin/admin.module').then(m => m.AdminModule),
    canActivate: [authGuard],
    data: { role: 'ROLE_ADMIN' }
  },
  {
    path: 'student',
    loadChildren: () => import('./pages/student/student.module').then(m => m.StudentModule),
    canActivate: [authGuard],
    data: { role: 'ROLE_STUDENT' }
  },
  {
    path: 'teacher',
    loadChildren: () => import('./pages/teacher/teacher.module').then(m => m.TeacherModule),
    canActivate: [authGuard],
    data: { role: 'ROLE_TEACHER' }
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule),
    canActivate: [accountGuard]
  },
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule)
  },
  {
    path: '**',
    redirectTo: ''
  }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
