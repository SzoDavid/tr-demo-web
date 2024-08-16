import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {StudentRoutingModule} from './student-routing.module';
import {AvailableSubjectsComponent} from './available-subjects/available-subjects.component';
import {TakenSubjectsComponent} from './taken-subjects/taken-subjects.component';


@NgModule({
  declarations: [
    AvailableSubjectsComponent,
    TakenSubjectsComponent
  ],
  imports: [
    CommonModule,
    StudentRoutingModule
  ]
})
export class StudentModule { }
