import {Component} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-timetable-dialog',
  templateUrl: './timetable-dialog.component.html',
  styleUrl: './timetable-dialog.component.scss'
})
export class TimetableDialogComponent {
  constructor(public dialogRef: MatDialogRef<TimetableDialogComponent>) {
  }
}
