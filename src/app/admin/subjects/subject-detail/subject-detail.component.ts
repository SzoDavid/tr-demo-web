import {Component, ViewChild} from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import {SubjectService} from "../../../shared/services/subject.service";
import {Subject} from "../../../shared/schemas/subject.schema";
import { MatTableDataSource, MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow } from "@angular/material/table";
import {Course} from "../../../shared/schemas/course.schema";
import { MatSort, MatSortHeader } from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {MatDialog} from "@angular/material/dialog";
import {EditSubjectDialogComponent} from "../edit-subject-dialog/edit-subject-dialog.component";
import {NewCourseDialogComponent} from "../new-course-dialog/new-course-dialog.component";
import {EditCourseDialogComponent} from "../edit-course-dialog/edit-course-dialog.component";
import {dialogConstants} from "../../../shared/constants";
import { DayFormatPipe } from '../../../shared/pipes/day-format.pipe';
import { SubjectTypeFormatPipe } from '../../../shared/pipes/subject-type-format.pipe';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { MatIconButton } from '@angular/material/button';

@Component({
    selector: 'app-subject-detail',
    templateUrl: './subject-detail.component.html',
    styleUrl: './subject-detail.component.scss',
    standalone: true,
    imports: [MatIconButton, MatTooltip, RouterLink, MatIcon, MatTable, MatSort, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatSortHeader, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow, MatPaginator, SubjectTypeFormatPipe, DayFormatPipe]
})
export class SubjectDetailComponent {
  subject: Subject = {
    id: 0,
    name: '',
    type: '',
    credit: 0,
    courses: []
  };
  displayedColumns: string[] = ['id', 'capacity', 'time', 'teacher'];
  dataSource = new MatTableDataSource<Course>();

  @ViewChild('paginator', {static: false}) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private subjectService: SubjectService,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.loadData()
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadData() {
    this.subjectService.get(this.route.snapshot.params['id']).subscribe({
      next: subject => {
        this.subject = subject;
        this.dataSource.data = subject.courses;
      },
      error: _ => {
        this.router.navigate(['not-found']);
      }
    });
  }

  openNewCourseDialog() {
    const dialogRef = this.dialog.open(NewCourseDialogComponent,
      { width: dialogConstants.width.new, data: { subject: this.subject }});
    dialogRef.afterClosed().subscribe(result => {
      if (result) this.loadData();
    });
  }

  openEditSubjectDialog() {
    const dialogRef = this.dialog.open(EditSubjectDialogComponent,
      { width: dialogConstants.width.edit, data: { subject: this.subject }});
    dialogRef.afterClosed().subscribe(result => {
      if (result) this.loadData();
    });
  }

  openEditCourseDialog(course: Course) {
    const dialogRef = this.dialog.open(EditCourseDialogComponent,
      {width: dialogConstants.width.edit, data: {course: course }});
    dialogRef.afterClosed().subscribe(result => {
      if (result) this.loadData();
    });
  }
}
