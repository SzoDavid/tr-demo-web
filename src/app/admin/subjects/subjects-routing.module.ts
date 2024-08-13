import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubjectsComponent } from './subjects.component';
import {SubjectDetailComponent} from "./subject-detail/subject-detail.component";

const routes: Routes = [{ path: '', component: SubjectsComponent }, { path: ':id', component: SubjectDetailComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubjectsRoutingModule { }
