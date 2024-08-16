import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";
import {UserService} from "../../../shared/services/user.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {PasswordValidator} from "../../../shared/validators/password.validator";
import {snackBarConstants} from "../../../shared/constants";

@Component({
  selector: 'app-change-password-dialog',
  templateUrl: './change-password-dialog.component.html',
  styleUrl: './change-password-dialog.component.scss'
})
export class ChangePasswordDialogComponent {
  changePasswordForm: FormGroup;
  errorMessage: string | null = null;
  loading = false;

  constructor(public dialogRef: MatDialogRef<ChangePasswordDialogComponent>,
              private fb: FormBuilder,
              private userService: UserService,
              private snackBar: MatSnackBar) {
    this.changePasswordForm = fb.group({
      oldPassword: ['', Validators.required],
      password: ['', [Validators.required, PasswordValidator.password]],
      passwordAgain: ['', Validators.required],
    }, {
      validators: PasswordValidator.matchPassword('password', 'passwordAgain')
    });
  }

  getFieldValue(field: string): any {
    return this.changePasswordForm.get(field)?.value;
  }

  changePassword() {
    this.errorMessage = null;
    if (this.changePasswordForm.invalid) return;
    this.loading = true;

    this.userService.changePassword(this.getFieldValue('oldPassword'), this.getFieldValue('password')).subscribe({
      next: (_) => {
        this.loading = false;
        this.dialogRef.close(true);
        this.snackBar.open('Jelszó sikeresen frissítve!', 'OK', {duration: snackBarConstants.duration.success});
      },
      error: (err: any) => {
        this.loading = false;
        this.errorMessage = err.error.errors.join('<br>');
        console.error('Update password error:', err);
      }
    });
  }

  onCancel() {
    this.dialogRef.close(false);
  }
}
