import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {
  @Output() selectedPage = new EventEmitter<string>();
  @Output() onCloseSidenav = new EventEmitter<boolean>();
  @Input() currentPage!: string;
  @Input() loggedIn!: boolean;

  menuSwitch() {
    this.selectedPage.emit(this.currentPage);
  }

  close() {
    this.onCloseSidenav.emit(true);
  }
}
