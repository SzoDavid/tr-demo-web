import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Subject} from "../../../shared/schemas/subject.schema";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ConfirmDialogComponent} from "../../../shared/confirm-dialog/confirm-dialog.component";
import {SubjectService} from "../../../shared/services/subject.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {dialogConstants, snackBarConstants} from "../../../shared/constants";

@Component({
  selector: 'app-edit-subject-dialog',
  templateUrl: './edit-subject-dialog.component.html',
  styleUrl: './edit-subject-dialog.component.scss'
})
export class EditSubjectDialogComponent {
  subject: Subject;
  editSubjectForm: FormGroup;
  errorMessage: string | null = null;
  loading = false;

  constructor(public dialogRef: MatDialogRef<EditSubjectDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: { subject: Subject },
              private fb: FormBuilder,
              private dialog: MatDialog,
              private subjectService: SubjectService,
              private snackBar: MatSnackBar) {
    this.subject = data.subject;
    this.editSubjectForm = this.fb.group({
      name: [data.subject.name, Validators.required],
      type: [data.subject.type, Validators.required],
      credit: [data.subject.credit, [Validators.required, Validators.min(0)]],
    });
  }

  getFieldValue(field: string): any {
    return this.editSubjectForm.get(field)?.value;
  }

  editSubject() {
    this.errorMessage = null;
    if (this.editSubjectForm.invalid) return;
    this.loading = true;
    this.subjectService.update(this.subject.id, {
      name: this.getFieldValue('name'),
      type: this.getFieldValue('type'),
      credit: this.getFieldValue('credit')
    }).subscribe({
      next: (response) => {
        this.loading = false;
        this.dialogRef.close(true);
        this.snackBar.open(`Tárgy sikeresen frissítve! Id: ${response.id}`, 'OK', {duration: snackBarConstants.duration.success});
      },
      error: (err: any) => {
        this.loading = false;
        this.errorMessage = err.error.errors.join('<br>');
        console.error('Edit error:', err);
      }
    });
  }

  deleteSubject() {
    const confirmDialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: dialogConstants.width.confirm,
      data: {
        message: 'Biztosan törli a tárgyat?',
        btnOkText: 'Igen',
        btnCancelText: 'Mégse'
      }
    });

    confirmDialogRef.afterClosed().subscribe(result => {
      if (!result) return;

      this.loading = true;
      this.errorMessage = null;

      this.subjectService.remove(this.subject.id).subscribe({
        next: (_) => {
          this.loading = false;
          this.dialogRef.close(true);
          this.snackBar.open(`Tárgy sikeresen törölve!`, 'OK', {duration: snackBarConstants.duration.success});
        },
        error: (err: any) => {
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
