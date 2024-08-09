import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;
  loading = false;

  constructor(private _router: Router, private _fb: FormBuilder) {
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
    if (this.loginForm.invalid) return;

    this.loading = true;

    // this._authService.login(this.getFieldValue('email'), this.getFieldValue('password')).then(_ => {
    //   this.loading = false;
    //   this._router.navigateByUrl('/');
    // }).catch(error => {
    //   console.error(error);
    // });
  }
}
