import {Component, ViewChild} from '@angular/core';
import {Subject} from "../../shared/schemas/subject.schema";
import {SubjectService} from "../../shared/services/subject.service";
import {MatDialog} from "@angular/material/dialog";
import {NewSubjectDialogComponent} from "./new-subject-dialog/new-subject-dialog.component";
import {EditSubjectDialogComponent} from "./edit-subject-dialog/edit-subject-dialog.component";
import {dialogConstants} from "../../shared/constants";
import {SubjectTypeFormatPipe} from "../../shared/pipes/subject-type-format.pipe";
import {ColumnDefinition, ReusableTableComponent} from "../../shared/reusable-table/reusable-table.component";
import {ActivatedRoute, Router} from "@angular/router";
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { MatIconButton } from '@angular/material/button';

@Component({
    selector: 'app-subjects',
    templateUrl: './subjects.component.html',
    styleUrl: './subjects.component.scss',
    providers: [SubjectTypeFormatPipe],
    standalone: true,
    imports: [MatIconButton, MatTooltip, MatIcon, ReusableTableComponent]
})
export class SubjectsComponent {
  columns: Array<ColumnDefinition> = [
    { def: 'id', header: 'ID', sortable: true, cell: (subject: Subject) => `${subject.id}` },
    { def: 'name', header: 'Név', sortable: true, cell: (subject: Subject) => `${subject.name}` },
    { def: 'type', header: 'Típus', sortable: true, cell: (subject: Subject) => `${this.subjectTypeFormat.transform(subject.type)}` },
    { def: 'credit', header: 'Kredit', sortable: true, cell: (subject: Subject) => `${subject.credit}` },
    { def: 'nCourses', header: 'Kurzusok', sortable: false, cell: (subject: Subject) => `${subject.courses.length}` }
  ];

  @ViewChild('reusableTable') reusableTable?: ReusableTableComponent;

  constructor(protected subjectService: SubjectService,
              private dialog: MatDialog,
              private subjectTypeFormat: SubjectTypeFormatPipe,
              private route: ActivatedRoute,
              private router: Router) {
  }

  openNewDialog() {
    const dialogRef = this.dialog.open(NewSubjectDialogComponent, {width: dialogConstants.width.new});

    dialogRef.afterClosed().subscribe(result => {
      if (result && this.reusableTable) this.reusableTable.loadPage();
    });
  }

  openEditDialog(subject: Subject) {
    const dialogRef = this.dialog.open(EditSubjectDialogComponent,
      {width: dialogConstants.width.edit, data: {subject: subject }});
    dialogRef.afterClosed().subscribe(result => {
      if (result && this.reusableTable) this.reusableTable.loadPage();
    });
  }

  onDetails(element: Subject) {
    this.router.navigate(['./', element.id], { relativeTo: this.route });
  }
}
