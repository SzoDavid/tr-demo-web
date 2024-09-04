import {Component, ViewChild} from '@angular/core';
import {User} from "../../shared/schemas/user.schema";
import {UserService} from "../../shared/services/user.service";
import {EditDialogComponent} from "./edit-dialog/edit-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {NewDialogComponent} from "./new-dialog/new-dialog.component";
import {dialogConstants} from "../../shared/constants";
import {RoleFormatPipe} from "../../shared/pipes/role-format.pipe";
import {ColumnDefinition, ReusableTableComponent} from "../../shared/reusable-table/reusable-table.component";
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { MatIconButton } from '@angular/material/button';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrl: './users.component.scss',
    providers: [RoleFormatPipe],
    standalone: true,
    imports: [MatIconButton, MatTooltip, MatIcon, ReusableTableComponent]
})
export class UsersComponent {
  columns: Array<ColumnDefinition<User>> = [
    { def: 'id', header: 'ID', sortable: true, cell: (user) => `${user.id}`},
    { def: 'name', header: 'Név', sortable: true, cell: (user) => `${user.name}`},
    { def: 'email', header: 'E-mail', sortable: true, cell: (user) => `${user.email}`},
    { def: 'roles', header: 'Szerepkör', sortable: true, cell: (user) => `${this.roleFormat.transform(user.roles)}`}
  ];
  @ViewChild('reusableTable') reusableTable?: ReusableTableComponent<User>;

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
