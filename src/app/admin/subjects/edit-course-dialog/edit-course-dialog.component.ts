import {Component, Inject} from '@angular/core';
import {Course} from "../../../shared/schemas/course.schema";
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatDialogTitle, MatDialogContent, MatDialogActions } from "@angular/material/dialog";
import {User} from "../../../shared/schemas/user.schema";
import {UserService} from "../../../shared/services/user.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {CourseService} from "../../../shared/services/course.service";
import {dialogConstants, snackBarConstants} from "../../../shared/constants";
import {ConfirmDialogComponent} from "../../../shared/confirm-dialog/confirm-dialog.component";
import { DayFormatPipe } from '../../../shared/pipes/day-format.pipe';
import { MatButton } from '@angular/material/button';
import { MatProgressBar } from '@angular/material/progress-bar';
import { NgFor, NgIf } from '@angular/common';
import { MatSelect, MatOption } from '@angular/material/select';
import { MatInput } from '@angular/material/input';
import { MatFormField, MatLabel } from '@angular/material/form-field';

@Component({
    selector: 'app-edit-course-dialog',
    templateUrl: './edit-course-dialog.component.html',
    styleUrl: './edit-course-dialog.component.scss',
    standalone: true,
    imports: [MatDialogTitle, ReactiveFormsModule, MatDialogContent, MatFormField, MatLabel, MatInput, MatSelect, MatOption, NgFor, NgIf, MatProgressBar, MatDialogActions, MatButton, DayFormatPipe]
})
export class EditCourseDialogComponent {
  course: Course;
  teachers: User[] = [];
  editCourseForm: FormGroup;
  errorMessage: string | null = null;
  loading = false;

  constructor(public dialogRef: MatDialogRef<EditCourseDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: { course: Course },
              private fb: FormBuilder,
              private dialog: MatDialog,
              private userService: UserService,
              private courseService: CourseService,
              private snackBar: MatSnackBar) {
    this.course = data.course;
    this.editCourseForm = this.fb.group({
      capacity: [data.course.capacity, [Validators.required, Validators.min(data.course.registeredStudentCount)]],
      teacherId: [data.course.teacher.id, Validators.required],
      day: [data.course.day, Validators.required],
      startTime: [data.course.startTime, Validators.required],
      endTime: [data.course.endTime, Validators.required],
    });
  }

  ngOnInit() {
    this.userService.getTeachers().subscribe({
      next: (data) => {
        this.teachers = data;
      },
      error: err => {
        console.error(err);
        this.snackBar.open('Nem sikerült a szerkesztéshez szükséges adatokat betölteni, próbálja újra később!',
          'OK', {duration: snackBarConstants.duration.error});
        this.dialogRef.close(false);
      }
    });
  }

  getFieldValue<T extends string | number>(field: string): T {
    return this.editCourseForm.get(field)?.value;
  }

  editCourse() {
    this.errorMessage = null;
    if (this.editCourseForm.invalid) return;
    this.loading = true;

    this.courseService.update({
      id: this.course.id,
      capacity: this.getFieldValue('capacity'),
      teacherId: this.getFieldValue('teacherId'),
      schedule: {
        day: this.getFieldValue('day'),
        startTime: this.getFieldValue('startTime'),
        endTime: this.getFieldValue('endTime')
      }
    }).subscribe({
      next: (response) => {
        this.loading = false;
        this.dialogRef.close(true);
        this.snackBar.open(`Kurzus sikeresen frissítve! Id: ${response.id}`, 'OK', {duration: snackBarConstants.duration.success});
      },
      error: (err: any) => {
        this.loading = false;
        this.errorMessage = err.error.errors.join('<br>');
        console.error('Edit error:', err);
      }
    });
  }

  deleteCourse() {
    const confirmDialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: dialogConstants.width.confirm,
      data: {
        message: 'Biztosan törli a kurzust?',
        btnOkText: 'Igen',
        btnCancelText: 'Mégse'
      }
    });

    confirmDialogRef.afterClosed().subscribe(result => {
      if (!result) return;

      this.loading = true;
      this.errorMessage = null;

      this.courseService.remove(this.course.id).subscribe({
        next: (_) => {
          this.loading = false;
          this.dialogRef.close(true);
          this.snackBar.open(`Kurzus sikeresen törölve!`, 'OK', {duration: snackBarConstants.duration.success });
        },
        error: (err: any) => { //TODO: refactor error handling
          this.loading = false;
          this.errorMessage = err.error;
          console.error('Delete error:', err);
        }
      });
    });
  }

  onCancel() {
    this.dialogRef.close(false);
  }
}
