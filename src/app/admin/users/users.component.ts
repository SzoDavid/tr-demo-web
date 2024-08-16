import {Component, ViewChild} from '@angular/core';
import {User} from "../../shared/schemas/user.schema";
import {UserService} from "../../shared/services/user.service";
import {EditDialogComponent} from "./edit-dialog/edit-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {NewDialogComponent} from "./new-dialog/new-dialog.component";
import {dialogConstants} from "../../shared/constants";
import {RoleFormatPipe} from "../../shared/pipes/role-format.pipe";
import {ColumnDefinition, ReusableTableComponent} from "../../shared/reusable-table/reusable-table.component";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
  providers: [RoleFormatPipe]
})
export class UsersComponent {
  columns: Array<ColumnDefinition> = [
    { def: 'id', header: 'ID', sortable: true, cell: (user: User) => `${user.id}`},
    { def: 'name', header: 'Név', sortable: true, cell: (user: User) => `${user.name}`},
    { def: 'email', header: 'E-mail', sortable: true, cell: (user: User) => `${user.email}`},
    { def: 'roles', header: 'Szerepkör', sortable: true, cell: (user: User) => `${this.roleFormat.transform(user.roles)}`}
  ];
  @ViewChild('reusableTable') reusableTable?: ReusableTableComponent;

  constructor(protected userService: UserService,
              private dialog: MatDialog,
              private roleFormat: RoleFormatPipe) {}


  openNewDialog() {
    const dialogRef = this.dialog.open(NewDialogComponent, {
      width: dialogConstants.width.new,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && this.reusableTable) this.reusableTable.loadPage();
    });
  }

  openEditDialog(user: User) {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      width: dialogConstants.width.edit,
      data: { user: user }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && this.reusableTable) this.reusableTable.loadPage()
    });
  }
}
