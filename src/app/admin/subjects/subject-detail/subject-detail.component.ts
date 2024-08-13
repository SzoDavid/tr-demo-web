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

  ngOnViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadData() {
    this.subjectService.get(this.route.snapshot.params['id']).subscribe({
      next: subject => {
        this.subject = subject;
        this.dataSource.data = subject.courses;
        console.log(this.subject);
      },
      error: _ => {
        this.router.navigate(['../'], { relativeTo: this.route });
      }
    });
  }

  openNewCourseDialog() {

  }

  openEditSubjectDialog() {
    const dialogRef = this.dialog.open(EditSubjectDialogComponent, {width: '600px', data: { subject: this.subject }});
    dialogRef.afterClosed().subscribe(result => {
      if (result) this.loadData();
    });
  }
}
