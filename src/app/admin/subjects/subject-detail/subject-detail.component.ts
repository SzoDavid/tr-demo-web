import {Component, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {SubjectService} from "../../../shared/services/subject.service";
import {Subject} from "../../../shared/schemas/subject.schema";
import {MatTableDataSource} from "@angular/material/table";
import {Course} from "../../../shared/schemas/course.schema";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {MatDialog} from "@angular/material/dialog";
import {EditSubjectDialogComponent} from "../edit-subject-dialog/edit-subject-dialog.component";
import {NewCourseDialogComponent} from "../new-course-dialog/new-course-dialog.component";
import {EditCourseDialogComponent} from "../edit-course-dialog/edit-course-dialog.component";
import {dialogConstants} from "../../../shared/constants";

@Component({
  selector: 'app-subject-detail',
  templateUrl: './subject-detail.component.html',
  styleUrl: './subject-detail.component.scss'
})
export class SubjectDetailComponent {
  subject: Subject = {
    id: 0,
    name: '',
    type: '',
    credit: 0,
    courses: []
  };
  displayedColumns: string[] = ['id', 'capacity', 'teacher'];
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
