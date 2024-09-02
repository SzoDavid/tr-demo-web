import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CourseService} from "../../shared/services/course.service";
import {Course} from "../../shared/schemas/course.schema";
import {ColumnDefinition} from "../../shared/reusable-table/reusable-table.component";
import {User} from "../../shared/schemas/user.schema";
import {UserService} from "../../shared/services/user.service";

interface Student {
  user: User;
  grade: number|undefined;
}

@Component({
  selector: 'app-teacher-course-details',
  templateUrl: './teacher-course-details.component.html',
  styleUrl: './teacher-course-details.component.scss'
})
export class TeacherCourseDetailsComponent {
  course: Course|undefined;
  columns: Array<ColumnDefinition> = [
    { def: 'id', header: 'ID', sortable: true, cell: (student: Student) => student.user.id},
    { def: 'name', header: 'Név', sortable: true, cell: (student: Student) => student.user.name},
    { def: 'email', header: 'E-mail', sortable: true, cell: (student: Student) => student.user.email},
    { def: 'grade', header: 'Osztályzat', sortable: true, cell: (student: Student) => student.grade ?? '-'}
  ];

  constructor(private userService: UserService,
              private route: ActivatedRoute,
              private router: Router,
              private courseService: CourseService) {
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

  }
}
