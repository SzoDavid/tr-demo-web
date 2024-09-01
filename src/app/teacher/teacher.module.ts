import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TeacherRoutingModule} from './teacher-routing.module';
import { AssignedCoursesComponent } from './assigned-courses/assigned-courses.component';
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {MatTooltip} from "@angular/material/tooltip";
import {ReusableTableModule} from "../shared/reusable-table/reusable-table.module";


@NgModule({
  declarations: [
    AssignedCoursesComponent
  ],
  imports: [
    CommonModule,
    TeacherRoutingModule,
    MatIcon,
    MatIconButton,
    MatTooltip,
    ReusableTableModule
  ]
})
export class TeacherModule { }
