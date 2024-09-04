import {Routes} from "@angular/router";

export default [
  { path: 'available-subjects', loadComponent: () => import('./available-subjects/available-subjects.component').then(m => m.AvailableSubjectsComponent) },
  { path: 'taken-courses', loadComponent: () => import('./taken-courses/taken-courses.component').then(m => m.TakenCoursesComponent) },
  { path: 'subjects/:id', loadComponent: () => import('./student-subject-details/student-subject-details.component').then(m => m.StudentSubjectDetailsComponent) },
  { path: 'timetable', loadComponent: () => import('./timetable/timetable.component').then(m => m.TimetableComponent) },
] satisfies Routes;
