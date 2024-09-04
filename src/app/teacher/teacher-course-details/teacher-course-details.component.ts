import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import {CourseService} from "../../shared/services/course.service";
import {Course} from "../../shared/schemas/course.schema";
import {ColumnDefinition, ReusableTableComponent} from "../../shared/reusable-table/reusable-table.component";
import {UserService} from "../../shared/services/user.service";
import {Student} from "../../shared/schemas/student.schema";
import {dialogConstants} from "../../shared/constants";
import {GradeDialogComponent} from "../grade-dialog/grade-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {GradeService} from "../../shared/services/grade.service";
import {ConfirmGradesDialogComponent} from "../confirm-grades-dialog/confirm-grades-dialog.component";
import { DayFormatPipe } from '../../shared/pipes/day-format.pipe';
import { NgIf } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { MatIconButton } from '@angular/material/button';

@Component({
    selector: 'app-teacher-course-details',
    templateUrl: './teacher-course-details.component.html',
    styleUrl: './teacher-course-details.component.scss',
    standalone: true,
    imports: [MatIconButton, MatTooltip, RouterLink, MatIcon, NgIf, ReusableTableComponent, DayFormatPipe]
})
export class TeacherCourseDetailsComponent {
  course: Course|undefined;
  columns: Array<ColumnDefinition> = [
    { def: 'student.id', header: 'ID', sortable: true, cell: (student: Student) => student.user.id},
    { def: 'student.name', header: 'Név', sortable: true, cell: (student: Student) => student.user.name},
    { def: 'student.email', header: 'E-mail', sortable: true, cell: (student: Student) => student.user.email},
    { def: 'grade', header: 'Osztályzat', sortable: false, cell: (student: Student) => student.grade ?? '-'}
  ];

  @ViewChild('tableComponent', {static: false}) reusableTable!: ReusableTableComponent;

  constructor(private userService: UserService,
              private route: ActivatedRoute,
              private router: Router,
              private courseService: CourseService,
              private dialog: MatDialog,
              private gradeService: GradeService) {
  }

  ngOnInit() {
    this.loadData()
  }

  loadData() {
    this.courseService.getAssignedById(this.route.snapshot.params['id']).subscribe({
      next: course => {
        this.course = course;
      },
      error: _ => {
        this.router.navigate(['not-found']);
      }
    });
  }

  fetchStudents(page: number, size: number, sortBy: string, sortDirection: string) {
    return this.userService.getStudentsByCourse(this.course!.id, page, size, sortBy, sortDirection);
  }

  onDownloadStudentList() {
    if (!this.course) return;

    this.userService.downloadStudentCsv(this.course.id);
  }

  onGradeStudent(student: any) {
    const dialogRef = this.dialog.open(GradeDialogComponent,
      { width: dialogConstants.width.new, data: { student: student, courseId: this.course!.id }});
    dialogRef.afterClosed().subscribe(result => {
      if (result && this.reusableTable) this.reusableTable.loadPage();
    });
  }

  onGradeCsvUpload(files: FileList | null) {
    if (!this.course || !files || !files[0]) return;

    this.gradeService.loadStudentCsv(files[0]).then(value => {
      const dialogRef = this.dialog.open(ConfirmGradesDialogComponent,
        { width: dialogConstants.width.table, data: { courseId: this.course!.id, grades: value }});
      dialogRef.afterClosed().subscribe(result => {
        if (result && this.reusableTable) this.reusableTable.loadPage();
      });
    });
  }
}
