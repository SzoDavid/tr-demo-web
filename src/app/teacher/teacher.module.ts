import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TeacherRoutingModule} from './teacher-routing.module';
import { AssignedCoursesComponent } from './assigned-courses/assigned-courses.component';
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatTooltip} from "@angular/material/tooltip";
import {ReusableTableModule} from "../shared/reusable-table/reusable-table.module";
import { TeacherCourseDetailsComponent } from './teacher-course-details/teacher-course-details.component';
import {DayFormatPipe} from "../shared/pipes/day-format.pipe";
import { GradeDialogComponent } from './grade-dialog/grade-dialog.component';
import {MatDialogActions, MatDialogContent, MatDialogTitle} from "@angular/material/dialog";
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatOption, MatSelect} from "@angular/material/select";
import {MatProgressBar} from "@angular/material/progress-bar";
import { ConfirmGradesDialogComponent } from './confirm-grades-dialog/confirm-grades-dialog.component';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable
} from "@angular/material/table";
import {MatSort, MatSortHeader} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";


@NgModule({
  declarations: [
    AssignedCoursesComponent,
    TeacherCourseDetailsComponent,
    GradeDialogComponent,
    ConfirmGradesDialogComponent
  ],
  imports: [
    CommonModule,
    TeacherRoutingModule,
    MatIcon,
    MatIconButton,
    MatTooltip,
    ReusableTableModule,
    DayFormatPipe,
    MatDialogTitle,
    ReactiveFormsModule,
    MatDialogContent,
    MatFormField,
    MatSelect,
    MatOption,
    MatLabel,
    MatProgressBar,
    MatButton,
    MatDialogActions,
    MatTable,
    MatSort,
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatSortHeader,
    MatHeaderCellDef,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatPaginator
  ]
})
export class TeacherModule { }
