import { Component } from '@angular/core';
import {ColumnDefinition} from "../../shared/reusable-table/reusable-table.component";
import {Course} from "../../shared/schemas/course.schema";
import {CourseService} from "../../shared/services/course.service";
import {SubjectTypeFormatPipe} from "../../shared/pipes/subject-type-format.pipe";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-taken-courses',
  templateUrl: './taken-courses.component.html',
  styleUrl: './taken-courses.component.scss',
  providers: [SubjectTypeFormatPipe]
})
export class TakenCoursesComponent {
  columns: Array<ColumnDefinition> = [
    { def: 'id', header: 'ID', sortable: true, cell: (course: Course) => `${course.id}`},
    { def: 'name', header: 'Név', sortable: false, cell: (course: Course) => `${course.subject.name}`},
    { def: 'type', header: 'Típus', sortable: false, cell: (course: Course) => `${this.subjectTypeFormat.transform(course.subject.type)}`},
    { def: 'credit', header: 'Kredit', sortable: false, cell: (course: Course) => `${course.subject.credit}`}
  ];

  constructor(protected courseService: CourseService,
              private subjectTypeFormat: SubjectTypeFormatPipe,
              private router: Router,
              private route: ActivatedRoute) {}

  onDetails(element: Course) {
    this.router.navigate(['../subjects', element.subject.id], {relativeTo: this.route});
  }
}
