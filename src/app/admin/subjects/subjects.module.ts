import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubjectsRoutingModule } from './subjects-routing.module';
import { SubjectsComponent } from './subjects.component';
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatTooltip} from "@angular/material/tooltip";
import {MatTableModule} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort, MatSortHeader} from "@angular/material/sort";
import {RoleFormatPipe} from "../../shared/pipes/role-format.pipe";
import {SubjectTypeFormatPipe} from "../../shared/pipes/subject-type-format.pipe";
import { NewSubjectDialogComponent } from './new-subject-dialog/new-subject-dialog.component';
import {MatDialogActions, MatDialogContent, MatDialogTitle} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import {MatOption, MatSelect} from "@angular/material/select";
import {MatProgressBar} from "@angular/material/progress-bar";
import { SubjectDetailComponent } from './subject-detail/subject-detail.component';
import { EditSubjectDialogComponent } from './edit-subject-dialog/edit-subject-dialog.component';
import { NewCourseDialogComponent } from './new-course-dialog/new-course-dialog.component';
import { EditCourseDialogComponent } from './edit-course-dialog/edit-course-dialog.component';


@NgModule({
  declarations: [
    SubjectsComponent,
    NewSubjectDialogComponent,
    SubjectDetailComponent,
    EditSubjectDialogComponent,
    NewCourseDialogComponent,
    EditCourseDialogComponent
  ],
  imports: [
    CommonModule,
    SubjectsRoutingModule,
    MatIcon,
    MatIconButton,
    MatTooltip,
    MatPaginator,
    MatSort,
    MatSortHeader,
    MatTableModule,
    RoleFormatPipe,
    SubjectTypeFormatPipe,
    MatDialogTitle,
    MatDialogContent,
    MatFormFieldModule,
    MatInput,
    ReactiveFormsModule,
    MatSelect,
    MatOption,
    MatProgressBar,
    MatDialogActions,
    MatButton,
  ]
})
export class SubjectsModule { }
