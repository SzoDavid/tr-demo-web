import {Routes} from '@angular/router';

export default [
  { path: 'assigned-courses', loadComponent: () => import('./assigned-courses/assigned-courses.component').then(m => m.AssignedCoursesComponent) },
  { path: 'assigned-courses/:id', loadComponent: () => import('./teacher-course-details/teacher-course-details.component').then(m => m.TeacherCourseDetailsComponent) },
] satisfies Routes;
