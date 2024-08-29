import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AvailableSubjectsComponent} from "./available-subjects/available-subjects.component";
import {TakenCoursesComponent} from "./taken-courses/taken-courses.component";
import {StudentSubjectDetailsComponent} from "./student-subject-details/student-subject-details.component";

const routes: Routes = [
  { path: 'available-subjects', component: AvailableSubjectsComponent },
  { path: 'taken-courses', component: TakenCoursesComponent },
  { path: 'subjects/:id', component: StudentSubjectDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
