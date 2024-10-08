import { Component } from '@angular/core';
import { ColumnDefinition, ReusableTableComponent } from "../../shared/reusable-table/reusable-table.component";
import {CourseService, TakenCourse} from "../../shared/services/course.service";
import {SubjectTypeFormatPipe} from "../../shared/pipes/subject-type-format.pipe";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import {DayFormatPipe} from "../../shared/pipes/day-format.pipe";
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { MatIconButton } from '@angular/material/button';

@Component({
    selector: 'app-taken-courses',
    templateUrl: './taken-courses.component.html',
    styleUrl: './taken-courses.component.scss',
    providers: [SubjectTypeFormatPipe, DayFormatPipe],
    standalone: true,
    imports: [MatIconButton, MatTooltip, RouterLink, MatIcon, ReusableTableComponent]
})
export class TakenCoursesComponent {
  columns: Array<ColumnDefinition<TakenCourse>> = [
    { def: 'course.id', header: 'ID', sortable: true, cell: (takenCourse) => `${takenCourse.course.id}`},
    { def: 'course.subject.name', header: 'Tárgy neve', sortable: true, cell: (takenCourse) => `${takenCourse.course.subject.name} (${takenCourse.course.subject.id})`},
    { def: 'course.day', header: 'Időpont', sortable: true, cell: (takenCourse) => `${this.dayFormat.transform(takenCourse.course.day)} ${takenCourse.course.startTime}-${takenCourse.course.endTime}`},
    { def: 'course.subject.type', header: 'Típus', sortable: true, cell: (takenCourse) => `${this.subjectTypeFormat.transform(takenCourse.course.subject.type)}`},
    { def: 'course.subject.credit', header: 'Kredit', sortable: true, cell: (takenCourse) => `${takenCourse.course.subject.credit}`},
    { def: 'grade', header: 'Osztályzat', sortable: false, cell: (takenCourse) => `${takenCourse.grade ?? '-'}`}
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
