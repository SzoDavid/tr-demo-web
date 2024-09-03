import {Component, Inject, ViewChild} from '@angular/core';
import {GradeListItem, GradeService} from "../../shared/services/grade.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {snackBarConstants} from "../../shared/constants";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-confirm-grades-dialog',
  templateUrl: './confirm-grades-dialog.component.html',
  styleUrl: './confirm-grades-dialog.component.scss'
})
export class ConfirmGradesDialogComponent {
  courseId: number;
  grades: GradeListItem[];
  errorMessage: string|null = null;
  loading = false;
  displayedColumns = ['id', 'name', 'grade'];
  dataSource = new MatTableDataSource<GradeListItem>();

  @ViewChild('paginator', {static: false}) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialogRef: MatDialogRef<ConfirmGradesDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: { courseId: number, grades: GradeListItem[] },
              private gradeService: GradeService,
              private snackBar: MatSnackBar) {
    this.courseId = data.courseId;
    this.grades=data.grades
    this.dataSource.data = data.grades
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  saveGrades() {
    this.errorMessage = null;
    this.loading = true;

    this.gradeService.gradeStudentBulk(this.courseId, this.grades).subscribe({
      next: (_) => {
        this.loading = false;
        this.dialogRef.close(true);
        this.snackBar.open('Osztályzatok mentve!', 'OK', {duration: snackBarConstants.duration.success});
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = err.error.errors.join('<br>');
        console.error('Save error:', err);
      }
    });
  }

  onCancel() {
    this.dialogRef.close(false);
  }
}
