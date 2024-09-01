import { Component } from '@angular/core';
import {ColumnDefinition} from "../../shared/reusable-table/reusable-table.component";
import {Course} from "../../shared/schemas/course.schema";
import {CourseService} from "../../shared/services/course.service";
import {SubjectTypeFormatPipe} from "../../shared/pipes/subject-type-format.pipe";
import {ActivatedRoute, Router} from "@angular/router";
import {DayFormatPipe} from "../../shared/pipes/day-format.pipe";
import {dialogConstants} from "../../shared/constants";
import {MatDialog} from "@angular/material/dialog";
import {TimetableDialogComponent} from "../timetable-dialog/timetable-dialog.component";

@Component({
  selector: 'app-taken-courses',
  templateUrl: './taken-courses.component.html',
  styleUrl: './taken-courses.component.scss',
  providers: [SubjectTypeFormatPipe, DayFormatPipe]
})
export class TakenCoursesComponent {
  columns: Array<ColumnDefinition> = [
    { def: 'course.id', header: 'ID', sortable: true, cell: (course: Course) => `${course.id}`},
    { def: 'course.subject.name', header: 'Tárgy neve', sortable: true, cell: (course: Course) => `${course.subject.name} (${course.subject.id})`},
    { def: 'course.day', header: 'Időpont', sortable: true, cell: (course: Course) => `${this.dayFormat.transform(course.day)} ${course.startTime}-${course.endTime}`},
    { def: 'course.subject.type', header: 'Típus', sortable: true, cell: (course: Course) => `${this.subjectTypeFormat.transform(course.subject.type)}`},
    { def: 'course.subject.credit', header: 'Kredit', sortable: true, cell: (course: Course) => `${course.subject.credit}`}
  ];

  constructor(protected courseService: CourseService,
              private subjectTypeFormat: SubjectTypeFormatPipe,
              private dayFormat: DayFormatPipe,
              private router: Router,
              private route: ActivatedRoute,
              private dialog: MatDialog) {}

  onDetails(element: Course) {
    this.router.navigate(['../subjects', element.subject.id], {relativeTo: this.route});
  }

  openTimetableDialog() {
    this.dialog.open(TimetableDialogComponent,
      {width: dialogConstants.width.edit});
  }
}
