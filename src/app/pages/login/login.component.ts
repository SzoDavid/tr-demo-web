import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../shared/services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
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
