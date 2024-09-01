import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AssignedCoursesComponent} from "./assigned-courses/assigned-courses.component";

const routes: Routes = [{ path: 'assigned-courses', component: AssignedCoursesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherRoutingModule { }
