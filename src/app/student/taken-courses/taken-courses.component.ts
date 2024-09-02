import { Component } from '@angular/core';
import {ColumnDefinition} from "../../shared/reusable-table/reusable-table.component";
import {CourseService, TakenCourse} from "../../shared/services/course.service";
import {SubjectTypeFormatPipe} from "../../shared/pipes/subject-type-format.pipe";
import {ActivatedRoute, Router} from "@angular/router";
import {DayFormatPipe} from "../../shared/pipes/day-format.pipe";

@Component({
  selector: 'app-taken-courses',
  templateUrl: './taken-courses.component.html',
  styleUrl: './taken-courses.component.scss',
  providers: [SubjectTypeFormatPipe, DayFormatPipe]
})
export class TakenCoursesComponent {
  columns: Array<ColumnDefinition> = [
    { def: 'course.id', header: 'ID', sortable: true, cell: (takenCourse: TakenCourse) => `${takenCourse.course.id}`},
    { def: 'course.subject.name', header: 'Tárgy neve', sortable: true, cell: (takenCourse: TakenCourse) => `${takenCourse.course.subject.name} (${takenCourse.course.subject.id})`},
    { def: 'course.day', header: 'Időpont', sortable: true, cell: (takenCourse: TakenCourse) => `${this.dayFormat.transform(takenCourse.course.day)} ${takenCourse.course.startTime}-${takenCourse.course.endTime}`},
    { def: 'course.subject.type', header: 'Típus', sortable: true, cell: (takenCourse: TakenCourse) => `${this.subjectTypeFormat.transform(takenCourse.course.subject.type)}`},
    { def: 'course.subject.credit', header: 'Kredit', sortable: true, cell: (takenCourse: TakenCourse) => `${takenCourse.course.subject.credit}`},
    { def: 'grade', header: 'Osztályzat', sortable: false, cell: (takenCourse: TakenCourse) => `${takenCourse.grade ?? '-'}`}
  ];

  constructor(protected courseService: CourseService,
              private subjectTypeFormat: SubjectTypeFormatPipe,
              private dayFormat: DayFormatPipe,
              private router: Router,
              private route: ActivatedRoute) {}

  onDetails(element: TakenCourse) {
    this.router.navigate(['../subjects', element.course.subject.id], {relativeTo: this.route});
  }
}
