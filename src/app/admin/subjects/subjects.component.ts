import {Component, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Subject} from "../../shared/schemas/subject.schema";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {SubjectService} from "../../shared/services/subject.service";
import {MatDialog} from "@angular/material/dialog";
import {NewSubjectDialogComponent} from "./new-subject-dialog/new-subject-dialog.component";
import {EditSubjectDialogComponent} from "./edit-subject-dialog/edit-subject-dialog.component";

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrl: './subjects.component.scss'
})
export class SubjectsComponent {
  displayedColumns: string[] = ['id', 'name', 'type', 'credit', 'nCourses'];
  dataSource = new MatTableDataSource<Subject>();
  totalElements = 0;

  @ViewChild('paginator', {static: false}) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private subjectService: SubjectService, private dialog: MatDialog) {
  }

  ngAfterViewInit() {
    this.loadSubjectsPage();
  }

  onPageChange(_: any) {
    this.loadSubjectsPage();
  }

  onSortChange() {
    this.loadSubjectsPage();
  }

  loadSubjectsPage() {
    const pageIndex = this.paginator ? this.paginator.pageIndex : 0;
    const pageSize = this.paginator ? this.paginator.pageSize : 10;
    const sortBy = this.sort ? this.sort.active : 'id';
    const sortDirection = this.sort ? this.sort.direction : 'asc';

    this.subjectService.getAll(pageIndex, pageSize, sortBy, sortDirection).subscribe(data => {
      this.dataSource.data = data.content;
      this.totalElements = data.totalElements;
    });
  }

  openNewDialog() {
    const dialogRef = this.dialog.open(NewSubjectDialogComponent, {width: '600px'});

    dialogRef.afterClosed().subscribe(result => {
      if (result) this.loadSubjectsPage();
    });
  }

  openEditDialog(subject: Subject) {
    const dialogRef = this.dialog.open(EditSubjectDialogComponent, {width: '600px', data: {subject: subject}});
    dialogRef.afterClosed().subscribe(result => {
      if (result) this.loadSubjectsPage();
    });
  }
}
