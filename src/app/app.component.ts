import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {MatSidenav} from "@angular/material/sidenav";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  routes = new Array<string>();
  loggedIn = false;

  constructor(private _router: Router) {}

  ngOnInit() {
    this.routes = this._router.config.map(conf => conf.path) as string[];
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
