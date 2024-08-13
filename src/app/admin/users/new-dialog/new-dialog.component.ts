import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../shared/services/user.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-new-dialog',
  templateUrl: './new-dialog.component.html',
  styleUrl: './new-dialog.component.scss'
})
export class NewDialogComponent {
  createUserForm: FormGroup;
  loading = false;
  errorMessage: string | null = null;

  constructor(public dialogRef: MatDialogRef<NewDialogComponent>, private fb: FormBuilder, private userService: UserService, private snackBar: MatSnackBar) {
    this.createUserForm = this.fb.group(
      {
        name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(255)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, this.validatePassword]],
        isAdmin: false,
        isTeacher: false,
        isStudent: false
      });
  }

  validatePassword(control: any) {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(control.value) ? null : {invalidPassword: true};
  }

  getFieldValue(field: string): any {
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
      email: this.getFieldValue('email'),
      name: this.getFieldValue('name'),
      password: this.getFieldValue('password'),
      roles: roles
    }).subscribe({
      next: (response) => {
        this.loading = false;
        this.dialogRef.close(true);
        this.snackBar.open(`Felhasználó sikeresen mentve! Id: ${response.id}`, 'OK', {duration: 5000});
      },
      error: (err: any) => {
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
