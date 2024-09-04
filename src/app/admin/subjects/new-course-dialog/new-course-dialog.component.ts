import {Component, Inject} from '@angular/core';
import {Subject} from "../../../shared/schemas/subject.schema";
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogTitle, MatDialogContent, MatDialogActions } from "@angular/material/dialog";
import {User} from "../../../shared/schemas/user.schema";
import {UserService} from "../../../shared/services/user.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {SubjectService} from "../../../shared/services/subject.service";
import {snackBarConstants} from "../../../shared/constants";
import { DayFormatPipe } from '../../../shared/pipes/day-format.pipe';
import { MatButton } from '@angular/material/button';
import { MatProgressBar } from '@angular/material/progress-bar';
import { NgFor, NgIf } from '@angular/common';
import { MatSelect, MatOption } from '@angular/material/select';
import { MatInput } from '@angular/material/input';
import { MatFormField, MatLabel } from '@angular/material/form-field';

@Component({
    selector: 'app-new-course-dialog',
    templateUrl: './new-course-dialog.component.html',
    styleUrl: './new-course-dialog.component.scss',
    standalone: true,
    imports: [MatDialogTitle, ReactiveFormsModule, MatDialogContent, MatFormField, MatLabel, MatInput, MatSelect, MatOption, NgFor, NgIf, MatProgressBar, MatDialogActions, MatButton, DayFormatPipe]
})
export class NewCourseDialogComponent {
  subject: Subject;
  teachers: User[] = [];
  createCourseForm: FormGroup;
  errorMessage: string | null = null;
  loading = false;

  constructor(public dialogRef: MatDialogRef<NewCourseDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: { subject: Subject },
              private fb: FormBuilder,
              private userService: UserService,
              private subjectService: SubjectService,
              private snackBar: MatSnackBar) {
    this.subject = data.subject;

    this.createCourseForm = this.fb.group({
      capacity: ['', [Validators.required, Validators.min(0)]],
      teacherId: ['', Validators.required],
      day: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.userService.getTeachers().subscribe({
      next: (data) => {
        this.teachers = data;
      },
      error: err => {
        console.error(err);
        this.snackBar.open('Nem sikerült a létrehozáshoz szükséges adatokat betölteni, próbálja újra később!',
          'OK', {duration: snackBarConstants.duration.error});
        this.dialogRef.close(false);
      }
    });
  }

  getFieldValue<T extends number | string>(field: string): T {
    return this.createCourseForm.get(field)?.value;
  }

  createCourse() {
    this.errorMessage = null;
    if (this.createCourseForm.invalid) return;
    this.loading = true;

    this.subjectService.addCourse(this.subject.id, {
      capacity: this.getFieldValue('capacity'),
      teacherId: this.getFieldValue('teacherId'),
      schedule: {
        day: this.getFieldValue('day'),
        startTime: this.getFieldValue('startTime'),
        endTime: this.getFieldValue('endTime'),
      }
    }).subscribe({
      next: (response) => {
        this.loading = false;
        this.dialogRef.close(true);
        this.snackBar.open(`Kurzus sikeresen mentve! Id: ${response.id}`, 'OK', {duration: snackBarConstants.duration.success});
      },
      error: (err: any) => { //TODO: refactor error handling
        this.loading = false;
        this.errorMessage = err.error.errors.join('<br>');
        console.error('Create course error:', err);
      }
    });
  }

  onCancel() {
    this.dialogRef.close(false);
  }
}
