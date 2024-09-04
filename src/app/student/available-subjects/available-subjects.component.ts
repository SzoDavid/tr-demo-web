import {Component} from '@angular/core';
import {Subject} from "../../shared/schemas/subject.schema";
import {SubjectService} from "../../shared/services/subject.service";
import { ColumnDefinition, ReusableTableComponent } from "../../shared/reusable-table/reusable-table.component";
import {SubjectTypeFormatPipe} from "../../shared/pipes/subject-type-format.pipe";
import {ActivatedRoute, Router} from "@angular/router";
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { MatIconButton } from '@angular/material/button';

@Component({
    selector: 'app-available-subjects',
    templateUrl: './available-subjects.component.html',
    styleUrl: './available-subjects.component.scss',
    providers: [SubjectTypeFormatPipe],
    standalone: true,
    imports: [ReusableTableComponent, MatIconButton, MatTooltip, MatIcon]
})
export class AvailableSubjectsComponent {
  columns: Array<ColumnDefinition<Subject>> = [
    { def: 'id', header: 'ID', sortable: true, cell: (subject) => `${subject.id}`},
    { def: 'name', header: 'Név', sortable: true, cell: (subject) => `${subject.name}`},
    { def: 'type', header: 'Típus', sortable: true, cell: (subject) => `${this.subjectTypeFormat.transform(subject.type)}`},
    { def: 'credit', header: 'Kredit', sortable: true, cell: (subject) => `${subject.credit}`},
    { def: 'nCourses', header: 'Kurzusok', sortable: false, cell: (subject) => `${subject.courses.length}` }
  ];

  constructor(protected subjectService: SubjectService,
              private subjectTypeFormat: SubjectTypeFormatPipe,
              private router: Router,
              private route: ActivatedRoute) {}

  onDetails(element: Subject) {
    this.router.navigate(['../subjects', element.id], {relativeTo: this.route});
  }
}

