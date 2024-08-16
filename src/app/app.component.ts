import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {MatSidenav} from "@angular/material/sidenav";
import {AuthService} from "./shared/services/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  routes = new Array<string>();
  loggedIn = false;
  isAdmin = false;
  isTeacher = false;
  isStudent = false;

  constructor(private _router: Router, private _authService: AuthService) {}

  ngOnInit() {
    this.routes = this._router.config.map(conf => conf.path) as string[];

    this._authService.getAuthStatus().subscribe(
      status => {
        this.loggedIn = status;
        const roles = this._authService.getRoles();
        this.isAdmin = roles.includes('ROLE_ADMIN');
        this.isTeacher = roles.includes('ROLE_TEACHER');
        this.isStudent = roles.includes('ROLE_STUDENT');
      }
    );
  }

  changePage(selectedPage: string) {
    this._router.navigateByUrl(selectedPage);
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
