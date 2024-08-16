import {Component} from '@angular/core';
import {User} from "../../shared/schemas/user.schema";
import {Router} from "@angular/router";
import {AuthService} from "../../shared/services/auth.service";
import {MatDialog} from "@angular/material/dialog";
import {ChangePasswordDialogComponent} from "./change-password-dialog/change-password-dialog.component";
import {dialogConstants} from "../../shared/constants";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  user: User;

  constructor(private router: Router, private authService: AuthService, private dialog: MatDialog) {
    this.user = {email: "", id: 0, name: "", roles: []};
    this.loadData();
  }

  loadData() {
    this.authService.getUserDetails().subscribe(user => {
      this.user = user;
    })
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  openChangePasswordDialog() {
    this.dialog.open(ChangePasswordDialogComponent, {
      width: dialogConstants.width.edit,
    });
  }
}
