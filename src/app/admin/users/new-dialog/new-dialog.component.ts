import {Component} from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from "@angular/forms";
import {UserService} from "../../../shared/services/user.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import { MatDialogRef, MatDialogTitle, MatDialogContent, MatDialogActions } from "@angular/material/dialog";
import {snackBarConstants} from "../../../shared/constants";
import {PasswordValidator} from "../../../shared/validators/password.validator";
import { MatButton } from '@angular/material/button';
import { MatProgressBar } from '@angular/material/progress-bar';
import { NgIf } from '@angular/common';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatInput } from '@angular/material/input';
import { MatFormField, MatLabel } from '@angular/material/form-field';

@Component({
    selector: 'app-new-dialog',
    templateUrl: './new-dialog.component.html',
    styleUrl: './new-dialog.component.scss',
    standalone: true,
    imports: [MatDialogTitle, ReactiveFormsModule, MatDialogContent, MatFormField, MatLabel, MatInput, MatCheckbox, NgIf, MatProgressBar, MatDialogActions, MatButton]
})
export class NewDialogComponent {
  createUserForm: FormGroup;
  loading = false;
  errorMessage: string | null = null;

  constructor(public dialogRef: MatDialogRef<NewDialogComponent>,
              private fb: FormBuilder,
              private userService: UserService,
              private snackBar: MatSnackBar) {
    this.createUserForm = this.fb.group(
      {
        name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(255)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, PasswordValidator.password]],
        isAdmin: false,
        isTeacher: false,
        isStudent: false
      });
  }

  getFieldValue(field: string): string | boolean {
    return this.createUserForm.get(field)?.value;
  }

  createUser() {
    this.errorMessage = null;
    if (this.createUserForm.invalid) return;
    this.loading = true;

    let roles = [];

    if (this.getFieldValue('isAdmin')) roles.push('ADMIN');
    if (this.getFieldValue('isTeacher')) roles.push('TEACHER');
    if (this.getFieldValue('isStudent')) roles.push('STUDENT');

    this.userService.create({
      email: this.getFieldValue('email').toString(),
      name: this.getFieldValue('name').toString(),
      password: this.getFieldValue('password').toString(),
      roles: roles
    }).subscribe({
      next: (response) => {
        this.loading = false;
        this.dialogRef.close(true);
        this.snackBar.open(`Felhasználó sikeresen mentve! Id: ${response.id}`, 'OK', {duration: snackBarConstants.duration.success});
      },
      error: (err: any) => { //TODO: refactor error handling
        this.loading = false;
        this.errorMessage = err.error.errors.join('<br>');
        console.error('Create user error:', err);
      }
    });
  }

  onCancel() {
    this.dialogRef.close(false);
  }
}
