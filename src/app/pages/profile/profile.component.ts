import { Component } from '@angular/core';
import {User} from "../../shared/schemas/user.schema";
import {Router} from "@angular/router";
import {AuthService} from "../../shared/services/auth.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  user: User;

  constructor(private _router: Router, private _authService: AuthService) {
    this.user = {email: "", id: 0, name: "", roles: []};
    this.loadData();
  }

  loadData() {
    this._authService.getUserDetails().subscribe(user => {
      this.user = user;
    })
  }

  onLogout() {
    this._authService.logout();
    this._router.navigate(['/']);
  }
}
