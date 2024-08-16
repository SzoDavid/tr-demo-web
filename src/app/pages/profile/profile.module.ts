import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import { ChangePasswordDialogComponent } from './change-password-dialog/change-password-dialog.component';
import {MatCheckbox} from "@angular/material/checkbox";
import {MatDialogActions, MatDialogContent, MatDialogTitle} from "@angular/material/dialog";
import {MatInput} from "@angular/material/input";
import {MatProgressBar} from "@angular/material/progress-bar";


@NgModule({
  declarations: [
    ProfileComponent,
    ChangePasswordDialogComponent
  ],
    imports: [
        CommonModule,
        ProfileRoutingModule,
        MatFormField,
        FormsModule,
        MatButton,
        MatCardModule,
        MatCheckbox,
        MatDialogActions,
        MatDialogContent,
        MatDialogTitle,
        MatInput,
        MatLabel,
        MatProgressBar,
        ReactiveFormsModule
    ]
})
export class ProfileModule { }
