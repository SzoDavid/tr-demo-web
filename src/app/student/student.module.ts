import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {StudentRoutingModule} from './student-routing.module';
import {AvailableSubjectsComponent} from './available-subjects/available-subjects.component';
import {ReusableTableModule} from "../shared/reusable-table/reusable-table.module";
import {MatIconButton} from "@angular/material/button";
import {MatTooltip} from "@angular/material/tooltip";
import {MatIcon} from "@angular/material/icon";
import { StudentSubjectDetailsComponent } from './student-subject-details/student-subject-details.component';
import { TakenCoursesComponent } from './taken-courses/taken-courses.component';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow, MatRowDef, MatTable
} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort, MatSortHeader} from "@angular/material/sort";
import {SubjectTypeFormatPipe} from "../shared/pipes/subject-type-format.pipe";
import {DayFormatPipe} from "../shared/pipes/day-format.pipe";
import {MatDialogContent, MatDialogTitle} from "@angular/material/dialog";
import {MatGridList, MatGridTile} from "@angular/material/grid-list";
import { TimetableComponent } from './timetable/timetable.component';


@NgModule({
  declarations: [
    AvailableSubjectsComponent,
    StudentSubjectDetailsComponent,
    TakenCoursesComponent,
    TimetableComponent
  ],
  imports: [
    CommonModule,
    StudentRoutingModule,
    ReusableTableModule,
    MatIconButton,
    MatTooltip,
    MatIcon,
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatPaginator,
    MatRow,
    MatRowDef,
    MatSort,
    MatSortHeader,
    MatTable,
    SubjectTypeFormatPipe,
    MatHeaderCellDef,
    DayFormatPipe,
    MatDialogTitle,
    MatDialogContent,
    MatGridList,
    MatGridTile
  ]
})
export class StudentModule { }
