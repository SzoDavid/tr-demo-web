import {Component, Inject, ViewChild} from '@angular/core';
import {GradeListItem, GradeService} from "../../shared/services/grade.service";
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogTitle, MatDialogContent, MatDialogActions } from "@angular/material/dialog";
import { MatTableDataSource, MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow } from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import { MatSort, MatSortHeader } from "@angular/material/sort";
import {snackBarConstants} from "../../shared/constants";
import {MatSnackBar} from "@angular/material/snack-bar";
import { MatButton } from '@angular/material/button';
import { MatProgressBar } from '@angular/material/progress-bar';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-confirm-grades-dialog',
    templateUrl: './confirm-grades-dialog.component.html',
    styleUrl: './confirm-grades-dialog.component.scss',
    standalone: true,
    imports: [MatDialogTitle, MatDialogContent, MatTable, MatSort, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatSortHeader, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow, MatPaginator, NgIf, MatProgressBar, MatDialogActions, MatButton]
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
