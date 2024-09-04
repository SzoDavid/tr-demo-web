import {Component} from '@angular/core';
import {User} from "../../shared/schemas/user.schema";
import {Router} from "@angular/router";
import {AuthService} from "../../shared/services/auth.service";
import {MatDialog} from "@angular/material/dialog";
import {ChangePasswordDialogComponent} from "./change-password-dialog/change-password-dialog.component";
import {dialogConstants, snackBarConstants} from "../../shared/constants";
import {CourseService} from "../../shared/services/course.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import { NgIf, DecimalPipe } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { MatCard, MatCardHeader, MatCardTitle, MatCardContent, MatCardActions } from '@angular/material/card';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrl: './profile.component.scss',
    standalone: true,
    imports: [MatCard, MatCardHeader, MatCardTitle, MatCardContent, MatButton, MatCardActions, NgIf, DecimalPipe]
})
export class ProfileComponent {
  user: User;
  isStudent: boolean = false;
  takenCourses: number = 0;
  average: number|undefined;

  constructor(private router: Router,
              private authService: AuthService,
              private courseService: CourseService,
              private snackBar: MatSnackBar,
              private dialog: MatDialog) {
    this.user = {email: "", id: 0, name: "", roles: []};
    this.loadData();
  }

  loadData() {
    this.authService.getUserDetails().subscribe(user => {
      this.user = user;
      this.isStudent = user.roles.includes('ROLE_STUDENT');

      this.courseService.getTaken(0, 1, '', '').subscribe({
        next: result => {
          this.takenCourses = result.totalElements;
        },
        error: err => {
          console.error(err);
          this.snackBar.open('Nem sikerült lekérni a felvett kurzusok számát!', 'OK', {duration: snackBarConstants.duration.error});
        }
      });

      this.authService.getAverage().subscribe({
        next: result => {
          if (result.hasAverage) this.average = result.average;
        },
        error: err => {
          console.error(err);
          this.snackBar.open('Nem sikerült lekérni az átlagot!', 'OK', {duration: snackBarConstants.duration.error});
        }
      });
    });
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
