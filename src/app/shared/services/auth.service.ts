import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {BehaviorSubject, catchError, map, Observable, tap, throwError} from 'rxjs';
import {LoginResp} from "../schemas/login-resp.schema";
import {JwtHelperService} from "@auth0/angular-jwt";
import {User} from "../schemas/user.schema";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authStatusSubject: BehaviorSubject<boolean>;

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {
    this.authStatusSubject = new BehaviorSubject<boolean>(this.isAuthenticated());
  }

  isAuthenticated(): boolean {
    return !this.jwtHelper.isTokenExpired();
  }

  getRoles(): string[] {
    const rawRoles = localStorage.getItem('roles');
    if (rawRoles == null) return [];

    return rawRoles.split(',');
  }

  getAuthStatus(): Observable<boolean> {
    return this.authStatusSubject.asObservable();
  }

  login(email: string, password: string): Observable<LoginResp> {
    return this.http.post<LoginResp>('/api/auth/login', {
      email: email,
      password: password
    }).pipe(
      tap(response => {
        localStorage.setItem('access_token', response.token);
        localStorage.setItem('roles', this.jwtHelper.decodeToken(response.token).roles);
        this.updateAuthStatus();
      }),
      catchError(this.handleError)
    );
  }

  logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('roles');
    this.updateAuthStatus();
  }

  getUserDetails(): Observable<User> {
    return this.http.get<any>('/api/user/me').pipe(
      map(response => this.mapToUser(response)),
      catchError(this.handleError)
    );
  }

  private mapToUser(response: any): User {
    return {
      id: response.id,
      name: response.name,
      email: response.email,
      roles: response.roles.map((role: {name: string}) => role.name),
    };
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error) {
      if (error.error.detail) {
        errorMessage = error.error.detail;
      } else if (error.error.message) {
        errorMessage = error.error.message;
      }
    } else if (error.message) {
      errorMessage = `Error: ${error.message}`;
    }
    return throwError(() => new Error(errorMessage));
  }

  private updateAuthStatus(): void {
    this.authStatusSubject.next(this.isAuthenticated());
  }
}
