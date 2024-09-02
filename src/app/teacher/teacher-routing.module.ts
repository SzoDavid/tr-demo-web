import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AssignedCoursesComponent} from "./assigned-courses/assigned-courses.component";
import {TeacherCourseDetailsComponent} from "./teacher-course-details/teacher-course-details.component";

const routes: Routes = [
  { path: 'assigned-courses', component: AssignedCoursesComponent },
  { path: 'assigned-courses/:id', component: TeacherCourseDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherRoutingModule { }
