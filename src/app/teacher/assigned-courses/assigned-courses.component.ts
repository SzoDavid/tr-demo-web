import { Component } from '@angular/core';
import { ColumnDefinition, ReusableTableComponent } from "../../shared/reusable-table/reusable-table.component";
import {Course} from "../../shared/schemas/course.schema";
import {SubjectTypeFormatPipe} from "../../shared/pipes/subject-type-format.pipe";
import {DayFormatPipe} from "../../shared/pipes/day-format.pipe";
import {CourseService} from "../../shared/services/course.service";
import {UserService} from "../../shared/services/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { MatIconButton } from '@angular/material/button';

@Component({
    selector: 'app-assigned-courses',
    templateUrl: './assigned-courses.component.html',
    styleUrl: './assigned-courses.component.scss',
    providers: [SubjectTypeFormatPipe, DayFormatPipe],
    standalone: true,
    imports: [ReusableTableComponent, MatIconButton, MatTooltip, MatIcon]
})
export class AssignedCoursesComponent {
  columns: Array<ColumnDefinition<Course>> = [
    { def: 'id', header: 'ID', sortable: true, cell: (course) => `${course.id}`},
    { def: 'subject.name', header: 'Tárgy neve', sortable: true, cell: (course) => `${course.subject.name} (${course.subject.id})`},
    { def: 'subject.type', header: 'Típus', sortable: true, cell: (course) => `${this.subjectTypeFormat.transform(course.subject.type)}`},
    { def: 'day', header: 'Időpont', sortable: true, cell: (course) => `${this.dayFormat.transform(course.day)} ${course.startTime}-${course.endTime}`}
  ];

  constructor(protected courseService: CourseService,
              private subjectTypeFormat: SubjectTypeFormatPipe,
              private dayFormat: DayFormatPipe,
              private userService: UserService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  onDetails(course: Course) {
    this.router.navigate(['./', course.id], {relativeTo: this.route});
  }

  onDownloadStudentList(course: Course) {
    this.userService.downloadStudentCsv(course.id);
  }
}
