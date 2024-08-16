import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AvailableSubjectsComponent} from "./available-subjects/available-subjects.component";
import {TakenSubjectsComponent} from "./taken-subjects/taken-subjects.component";

const routes: Routes = [{ path: 'available-subjects', component: AvailableSubjectsComponent }, { path: 'taken-subjects', component: TakenSubjectsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
