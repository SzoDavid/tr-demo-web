import {Component} from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../shared/services/auth.service";
import { MatButton } from '@angular/material/button';
import { MatInput } from '@angular/material/input';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatCard, MatCardHeader, MatCardTitle, MatCardContent, MatCardActions } from '@angular/material/card';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss',
    standalone: true,
    imports: [NgIf, MatProgressSpinner, ReactiveFormsModule, MatCard, MatCardHeader, MatCardTitle, MatCardContent, MatFormField, MatLabel, MatInput, MatCardActions, MatButton]
})
export class LoginComponent {
  loginForm: FormGroup;
  loading = false;
  errorMessage: string | null = null;

  constructor(private _router: Router, private _fb: FormBuilder, private _authService: AuthService) {
    this.loginForm = this._fb.group(
      {
        email: ['', [Validators.required]],
        password: ['', [Validators.required]]
      });
  }

  getFieldValue(field: string): any {
    return this.loginForm.get(field)?.value;
  }

  login() {
    this.errorMessage = null;

    if (this.loginForm.invalid) return;

    this.loading = true;

    this._authService.login(this.getFieldValue('email'), this.getFieldValue('password')).subscribe({
      next: (_) => {
        this.loading = false;
        this._router.navigate(['/']);
      },
      error: (err: any) => {
        this.loading = false;
        this.errorMessage = err.message;
        console.error('Login error:', err);
      }
    });
  }
}
