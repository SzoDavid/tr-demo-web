import {Component, EventEmitter, Input, Output} from '@angular/core';
import { NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatNavList, MatListItem } from '@angular/material/list';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrl: './menu.component.scss',
    standalone: true,
    imports: [MatNavList, MatListItem, RouterLink, NgIf]
})
export class MenuComponent {
  @Output() selectedPage = new EventEmitter<string>();
  @Output() onCloseSidenav = new EventEmitter<boolean>();
  @Input() currentPage!: string;
  @Input() loggedIn!: boolean;
  @Input() isAdmin!: boolean;
  @Input() isTeacher!: boolean;
  @Input() isStudent!: boolean;

  menuSwitch() {
    this.selectedPage.emit(this.currentPage);
  }

  close() {
    this.onCloseSidenav.emit(true);
  }
}
