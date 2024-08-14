import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {User} from "../../../shared/schemas/user.schema";
import {FormBuilder, FormGroup} from "@angular/forms";
import {UserService} from "../../../shared/services/user.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ConfirmDialogComponent} from "../../../shared/confirm-dialog/confirm-dialog.component";
import {dialogConstants, snackBarConstants} from "../../../shared/constants";

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrl: './edit-dialog.component.scss'
})
export class EditDialogComponent {
  user: User;
  editUserForm: FormGroup;
  errorMessage: string | null = null;
  loading = false;

  constructor(
    public dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { user: User },
    private fb: FormBuilder,
    private userService: UserService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {
    this.user = data.user;

    this.editUserForm = this.fb.group({
      isAdmin: this.user.roles.includes('ROLE_ADMIN'),
      isTeacher: this.user.roles.includes('ROLE_TEACHER'),
      isStudent: this.user.roles.includes('ROLE_STUDENT')
    });

  }

  getFieldValue(field: string): any {
    return this.editUserForm.get(field)?.value;
  }

  onCancel() {
    this.dialogRef.close(false);
  }

  editUser() {
    this.loading = true;

    const roles = [];

    if (this.getFieldValue('isAdmin')) roles.push('ADMIN');
    if (this.getFieldValue('isTeacher')) roles.push('TEACHER');
    if (this.getFieldValue('isStudent')) roles.push('STUDENT');

    this.userService.update(this.user.id, roles).subscribe({
      next: (response) => {
        this.loading = false;
        this.dialogRef.close(true);
        this.snackBar.open(`Felhasználó sikeresen frissítve! Id: ${response.id}`, 'OK', {duration: snackBarConstants.duration.success});
      },
      error: (err: any) => {
        this.loading = false;
        this.errorMessage = err.error.errors.join('<br>');
        console.error('Edit error:', err);
      }
    });
  }

  deleteUser() {
    const confirmDialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: dialogConstants.width.confirm,
      data: {
        message: 'Biztosan törli a felhasználót?',
        btnOkText: 'Igen',
        btnCancelText: 'Mégse'
      }
    });

    confirmDialogRef.afterClosed().subscribe(result => {
      if (!result) return;

      this.userService.remove(this.user.id).subscribe({
        next: (_) => {
          this.loading = false;
          this.dialogRef.close(true);
          this.snackBar.open(`Felhasználó sikeresen törölve!`, 'OK', {duration: snackBarConstants.duration.success});
        },
        error: (err: any) => {
          this.loading = false;
          this.errorMessage = err.error;
          console.error('Delete error:', err);
        }
      });
    });
  }
}
