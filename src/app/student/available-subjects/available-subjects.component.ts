import {Component, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Subject} from "../../shared/schemas/subject.schema";
import { MatSort } from '@angular/material/sort';
import {MatPaginator} from "@angular/material/paginator";
import {SubjectService} from "../../shared/services/subject.service";

@Component({
  selector: 'app-available-subjects',
  templateUrl: './available-subjects.component.html',
  styleUrl: './available-subjects.component.scss'
})
export class AvailableSubjectsComponent {
  displayedColumns: string[] = ['id', 'name', 'type', 'credit', 'nCourses'];
  dataSource = new MatTableDataSource<Subject>();
  totalElements = 0;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private subjectService: SubjectService) {
  }

  onPageChange() {
    this.loadSubjects();
  }

  onSortChange() {
    this.loadSubjects();
  }

  loadSubjects() {
    const pageIndex = this.paginator ? this.paginator.pageIndex : 0;
    const pageSize = this.paginator ? this.paginator.pageSize : 10;
    const sortBy = this.sort ? this.sort.active : 'id';
    const sortDirection = this.sort ? this.sort.direction : 'asc';

    this.subjectService.getTaken(pageIndex, pageSize, sortBy, sortDirection).subscribe(data => {
      this.dataSource.data = data.content;
      this.totalElements = data.totalElements;
    });
  }
}
