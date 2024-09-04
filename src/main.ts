import { importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component';
import { JwtModule } from '@auth0/angular-jwt';
import { withInterceptorsFromDi, provideHttpClient } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {provideRouter} from "@angular/router";
import { ROUTES } from "./app/routes";


export function tokenGetter() {
  return localStorage.getItem("access_token");
}

bootstrapApplication(AppComponent, {
    providers: [
        provideRouter(ROUTES),
        importProvidersFrom(CommonModule, BrowserModule, MatListModule, MatIconModule, MatSidenavModule, MatToolbarModule, MatButtonModule, JwtModule.forRoot({
            config: {
                tokenGetter: tokenGetter,
                allowedDomains: ['/api'],
                disallowedRoutes: ['/api/auth/login'],
            }
        })),
        provideAnimationsAsync(),
        provideHttpClient(withInterceptorsFromDi())
    ]
})
  .catch(err => console.error(err));
