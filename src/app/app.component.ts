import {Component} from '@angular/core';
import { Router, RouterLink, RouterOutlet } from "@angular/router";
import { MatSidenav, MatSidenavContainer, MatSidenavContent } from "@angular/material/sidenav";
import {AuthService} from "./shared/services/auth.service";
import { NgIf } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { MatToolbar } from '@angular/material/toolbar';
import { MenuComponent } from './shared/menu/menu.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    standalone: true,
    imports: [MatSidenavContainer, MatSidenav, MenuComponent, MatSidenavContent, MatToolbar, MatIconButton, MatIcon, RouterLink, NgIf, RouterOutlet]
})
export class AppComponent {
  routes = new Array<string>();
  loggedIn = false;
  isAdmin = false;
  isTeacher = false;
  isStudent = false;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.routes = this.router.config.map(conf => conf.path) as string[];

    this.authService.getAuthStatus().subscribe(
      status => {
        this.loggedIn = status;
        const roles = this.authService.getRoles();
        this.isAdmin = roles.includes('ROLE_ADMIN');
        this.isTeacher = roles.includes('ROLE_TEACHER');
        this.isStudent = roles.includes('ROLE_STUDENT');
      }
    );
  }

  changePage(selectedPage: string) {
    this.router.navigateByUrl(selectedPage);
  }

  onSidenavClose(event: any, sidenav: MatSidenav) {
    if (event === true) {
      sidenav.close();
    }
  }

  onToggleSidenav(sidenav: MatSidenav) {
    sidenav.toggle();
  }

}
