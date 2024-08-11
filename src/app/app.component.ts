import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {MatSidenav} from "@angular/material/sidenav";
import {AuthService} from "./services/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  routes = new Array<string>();
  loggedIn = false;

  constructor(private _router: Router, private _authService: AuthService) {}

  ngOnInit() {
    this.routes = this._router.config.map(conf => conf.path) as string[];

    this._authService.getAuthStatus().subscribe(
      status => this.loggedIn = status
    );
  }

  changePage(selectedPage: string) {
    if (selectedPage === 'logout') {
      this.logout();
      return;
    }

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

  logout() {
    this._authService.logout();
    this._router.navigate(['/']);
  }
}
