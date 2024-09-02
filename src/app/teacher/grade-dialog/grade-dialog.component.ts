import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Student} from "../../shared/schemas/student.schema";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {GradeService} from "../../shared/services/grade.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {snackBarConstants} from "../../shared/constants";

@Component({
  selector: 'app-grade-dialog',
  templateUrl: './grade-dialog.component.html',
  styleUrl: './grade-dialog.component.scss'
})
export class GradeDialogComponent {
  courseId: number;
  student: Student;
  gradeForm: FormGroup;
  errorMessage: string|null = null;
  loading = false;

  constructor(public dialogRef: MatDialogRef<GradeDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: { student: Student, courseId: number },
              private fb: FormBuilder,
              private gradeService: GradeService,
              private snackBar: MatSnackBar) {
    this.student = data.student;
    this.courseId = data.courseId;

    this.gradeForm = this.fb.group({
      grade: [this.student.grade, [Validators.required, Validators.min(1), Validators.max(5)]],
    });
  }

  getFieldValue(field: string): any {
    return this.gradeForm.get(field)?.value;
  }

  saveGrade() {
    this.errorMessage = null;
    if (this.gradeForm.invalid) return;
    this.loading = true;

    this.gradeService.gradeStudent(this.courseId,
                                   this.student.user.id,
                                   this.getFieldValue('grade')).subscribe({
      next: (_) => {
        this.loading = false;
        this.dialogRef.close(true);
        this.snackBar.open('Osztályzat mentve!', 'OK', {duration: snackBarConstants.duration.success});
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
