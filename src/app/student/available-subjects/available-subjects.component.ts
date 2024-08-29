import {Component} from '@angular/core';
import {Subject} from "../../shared/schemas/subject.schema";
import {SubjectService} from "../../shared/services/subject.service";
import {ColumnDefinition} from "../../shared/reusable-table/reusable-table.component";
import {SubjectTypeFormatPipe} from "../../shared/pipes/subject-type-format.pipe";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-available-subjects',
  templateUrl: './available-subjects.component.html',
  styleUrl: './available-subjects.component.scss',
  providers: [SubjectTypeFormatPipe]
})
export class AvailableSubjectsComponent {
  columns: Array<ColumnDefinition> = [
    { def: 'id', header: 'ID', sortable: true, cell: (subject: Subject) => `${subject.id}`},
    { def: 'name', header: 'Név', sortable: true, cell: (subject: Subject) => `${subject.name}`},
    { def: 'type', header: 'Típus', sortable: true, cell: (subject: Subject) => `${this.subjectTypeFormat.transform(subject.type)}`},
    { def: 'credit', header: 'Kredit', sortable: true, cell: (subject: Subject) => `${subject.credit}`},
    { def: 'nCourses', header: 'Kurzusok', sortable: false, cell: (subject: Subject) => `${subject.courses.length}` }
  ];

  constructor(protected subjectService: SubjectService,
              private subjectTypeFormat: SubjectTypeFormatPipe,
              private router: Router,
              private route: ActivatedRoute) {}

  onDetails(element: Subject) {
    this.router.navigate(['../subjects', element.id], {relativeTo: this.route});
  }
}

