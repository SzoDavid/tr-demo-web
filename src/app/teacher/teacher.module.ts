import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TeacherRoutingModule} from './teacher-routing.module';
import { AssignedCoursesComponent } from './assigned-courses/assigned-courses.component';
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {MatTooltip} from "@angular/material/tooltip";
import {ReusableTableModule} from "../shared/reusable-table/reusable-table.module";
import { TeacherCourseDetailsComponent } from './teacher-course-details/teacher-course-details.component';
import {DayFormatPipe} from "../shared/pipes/day-format.pipe";
import { GradeDialogComponent } from './grade-dialog/grade-dialog.component';


@NgModule({
  declarations: [
    AssignedCoursesComponent,
    TeacherCourseDetailsComponent,
    GradeDialogComponent
  ],
  imports: [
    CommonModule,
    TeacherRoutingModule,
    MatIcon,
    MatIconButton,
    MatTooltip,
    ReusableTableModule,
    DayFormatPipe
  ]
})
export class TeacherModule { }
