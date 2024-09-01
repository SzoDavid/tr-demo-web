import {Component, Inject} from '@angular/core';
import {Subject} from "../../../shared/schemas/subject.schema";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {User} from "../../../shared/schemas/user.schema";
import {UserService} from "../../../shared/services/user.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {SubjectService} from "../../../shared/services/subject.service";
import {snackBarConstants} from "../../../shared/constants";

@Component({
  selector: 'app-new-course-dialog',
  templateUrl: './new-course-dialog.component.html',
  styleUrl: './new-course-dialog.component.scss'
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

  getFieldValue(field: string): any {
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
      error: (err: any) => {
        this.loading = false;
        this.errorMessage = err.error;
        console.error('Create course error:', err);
      }
    });
  }

  onCancel() {
    this.dialogRef.close(false);
  }
}
