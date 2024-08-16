import {Component, ViewChild} from '@angular/core';
import {User} from "../../shared/schemas/user.schema";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {UserService} from "../../shared/services/user.service";
import {MatSort} from "@angular/material/sort";
import {EditDialogComponent} from "./edit-dialog/edit-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {NewDialogComponent} from "./new-dialog/new-dialog.component";
import {dialogConstants} from "../../shared/constants";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {
  displayedColumns: string[] = ['id', 'name', 'email', 'roles'];
  dataSource = new MatTableDataSource<User>();
  totalElements = 0;

  @ViewChild('paginator', {static: false}) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private userService: UserService, private dialog: MatDialog) {}

  ngAfterViewInit() {
    this.loadUsersPage();
  }

  onPageChange(event: any) {
    this.loadUsersPage();
  }

  onSortChange() {
    this.loadUsersPage();
  }

  loadUsersPage() {
    const pageIndex = this.paginator ? this.paginator.pageIndex : 0;
    const pageSize = this.paginator ? this.paginator.pageSize : 10;
    const sortBy = this.sort ? this.sort.active : 'id';
    const sortDirection = this.sort ? this.sort.direction : 'asc';
    
    this.userService.getAll(pageIndex, pageSize, sortBy, sortDirection).subscribe(data => {
      this.dataSource.data = data.content;
      this.totalElements = data.totalElements;
    });
  }

  openNewDialog() {
    const dialogRef = this.dialog.open(NewDialogComponent, {
      width: dialogConstants.width.new,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) this.loadUsersPage();
    });
  }

  openEditDialog(user: User) {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      width: dialogConstants.width.edit,
      data: { user: user }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) this.loadUsersPage();
    });
  }
}
