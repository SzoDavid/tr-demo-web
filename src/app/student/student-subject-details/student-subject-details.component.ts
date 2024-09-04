import {Component, ViewChild} from '@angular/core';
import {Subject} from "../../shared/schemas/subject.schema";
import { MatTableDataSource, MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow } from "@angular/material/table";
import {Course} from "../../shared/schemas/course.schema";
import {SubjectService} from "../../shared/services/subject.service";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import {CourseService} from "../../shared/services/course.service";
import {MatPaginator} from "@angular/material/paginator";
import { MatSort, MatSortHeader } from "@angular/material/sort";
import {MatSnackBar} from "@angular/material/snack-bar";
import {snackBarConstants} from "../../shared/constants";
import { DayFormatPipe } from '../../shared/pipes/day-format.pipe';
import { SubjectTypeFormatPipe } from '../../shared/pipes/subject-type-format.pipe';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { MatIconButton } from '@angular/material/button';
import { NgIf, NgClass } from '@angular/common';

@Component({
    selector: 'app-student-subject-details',
    templateUrl: './student-subject-details.component.html',
    styleUrl: './student-subject-details.component.scss',
    standalone: true,
    imports: [NgIf, MatIconButton, MatTooltip, RouterLink, MatIcon, MatTable, MatSort, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatSortHeader, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow, NgClass, MatPaginator, SubjectTypeFormatPipe, DayFormatPipe]
})
export class StudentSubjectDetailsComponent {
  subject: Subject = {
    id: 0,
    name: '',
    type: '',
    credit: 0,
    courses: []
  };
  takenCourseId: number|undefined;
  displayedColumns: string[] = ['id', 'capacity', 'day', 'teacher'];
  dataSource = new MatTableDataSource<Course>();

  @ViewChild('paginator', {static: false}) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private subjectService: SubjectService,
              private courseService: CourseService,
              private route: ActivatedRoute,
              private router: Router,
              private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.loadData()
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadData() {
    this.subjectService.get(this.route.snapshot.params['id']).subscribe({
      next: subject => {
        this.subject = subject;

        this.courseService.getTakenOfSubject(subject.id).subscribe({
          next: course => {
            this.dataSource.data = subject.courses;
            this.takenCourseId = course.id;
          },
          error: err => {
            if (err.status != 404) console.error(err);
            this.dataSource.data = subject.courses;
            this.takenCourseId = undefined;
          }
        })
      },
      error: _ => {
        this.router.navigate(['not-found']);
      }
    });
  }

  addCourse(course: Course) {
    this.courseService.registerCourse(course.id).subscribe({
      next: _ => {
        this.loadData();
      },
      error: err => {
        console.error(err);
        this.snackBar.open('Hiba történt!', 'OK', {duration: snackBarConstants.duration.error});
      }
    });
  }

  dropCourse(course: Course) {
    this.courseService.dropCourse(course.id).subscribe({
      next: _ => {
        this.loadData();
      },
      error: err => {
        console.error(err);
        this.snackBar.open('Hiba történt!', 'OK', {duration: snackBarConstants.duration.error});
      }
    });
  }
}
