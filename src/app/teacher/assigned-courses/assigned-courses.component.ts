import { Component } from '@angular/core';
import {ColumnDefinition} from "../../shared/reusable-table/reusable-table.component";
import {Course} from "../../shared/schemas/course.schema";
import {SubjectTypeFormatPipe} from "../../shared/pipes/subject-type-format.pipe";
import {DayFormatPipe} from "../../shared/pipes/day-format.pipe";
import {CourseService} from "../../shared/services/course.service";
import {UserService} from "../../shared/services/user.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-assigned-courses',
  templateUrl: './assigned-courses.component.html',
  styleUrl: './assigned-courses.component.scss',
  providers: [SubjectTypeFormatPipe, DayFormatPipe]
})
export class AssignedCoursesComponent {
  columns: Array<ColumnDefinition> = [
    { def: 'id', header: 'ID', sortable: true, cell: (course: Course) => `${course.id}`},
    { def: 'subject.name', header: 'Tárgy neve', sortable: true, cell: (course: Course) => `${course.subject.name} (${course.subject.id})`},
    { def: 'subject.type', header: 'Típus', sortable: true, cell: (course: Course) => `${this.subjectTypeFormat.transform(course.subject.type)}`},
    { def: 'day', header: 'Időpont', sortable: true, cell: (course: Course) => `${this.dayFormat.transform(course.day)} ${course.startTime}-${course.endTime}`}
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
