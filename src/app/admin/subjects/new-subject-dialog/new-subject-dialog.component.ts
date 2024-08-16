import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";
import {SubjectService} from "../../../shared/services/subject.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {snackBarConstants} from "../../../shared/constants";

@Component({
  selector: 'app-new-subject-dialog',
  templateUrl: './new-subject-dialog.component.html',
  styleUrl: './new-subject-dialog.component.scss'
})
export class NewSubjectDialogComponent {
  createSubjectForm: FormGroup;
  errorMessage: string | null = null;
  loading = false;

  constructor(public dialogRef: MatDialogRef<NewSubjectDialogComponent>,
              private fb: FormBuilder,
              private subjectService: SubjectService,
              private snackBar: MatSnackBar) {
    this.createSubjectForm = this.fb.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      credit: ['', [Validators.required, Validators.min(0)]],
    });
  }

  getFieldValue(field: string): any {
    return this.createSubjectForm.get(field)?.value;
  }

  createSubject() {
    this.errorMessage = null;
    if (this.createSubjectForm.invalid) return;
    this.loading = true;

    this.subjectService.create({
      name: this.getFieldValue('name'),
      type: this.getFieldValue('type'),
      credit: this.getFieldValue('credit')
    }).subscribe({
      next: (response) => {
        this.loading = false;
        this.dialogRef.close(true);
        this.snackBar.open(`Tárgy sikeresen mentve! Id: ${response.id}`, 'OK', {duration: snackBarConstants.duration.success});
      },
      error: (err: any) => {
        this.loading = false;
        this.errorMessage = err.error.errors.join('<br>');
        console.error('Create subject error:', err);
      }
    });
  }

  onCancel() {
    this.dialogRef.close(false);
  }
}
