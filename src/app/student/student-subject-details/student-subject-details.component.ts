import {Component, ViewChild} from '@angular/core';
import {Subject} from "../../shared/schemas/subject.schema";
import {MatTableDataSource} from "@angular/material/table";
import {Course} from "../../shared/schemas/course.schema";
import {SubjectService} from "../../shared/services/subject.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CourseService} from "../../shared/services/course.service";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatSnackBar} from "@angular/material/snack-bar";
import {snackBarConstants} from "../../shared/constants";

@Component({
  selector: 'app-student-subject-details',
  templateUrl: './student-subject-details.component.html',
  styleUrl: './student-subject-details.component.scss'
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
  displayedColumns: string[] = ['id', 'capacity', 'teacher'];
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

  ngOnViewInit() {
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
