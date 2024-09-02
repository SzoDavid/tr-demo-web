import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {User} from "../schemas/user.schema";
import {CreateUser} from "../schemas/create-user.schema";
import {PaginationService} from "./pagination.service";
import {saveAs} from "file-saver";

export interface UserPage {
  content: User[],
  totalElements: number
}

export interface StudentPage {
  content: { user: User, grade: number|undefined }[],
  totalElements: number
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient,
              private paginationService: PaginationService) { }

  getAll(page: number, size: number, sortBy: string, sortDirection: string): Observable<UserPage> {
    return this.paginationService.getPaginated<any>('/api/admin/users', page, size, sortBy, sortDirection).pipe(
      map(response => ({
        content: response.content.map(user => ({
          id: user.id,
          name: user.name,
          email: user.email,
          roles: user.roles.map((role: any) => role.name)
        })),
        totalElements: response.totalElements
      }))
    );
  }

  getTeachers(): Observable<User[]> {
    return this.http.get<any>('/api/admin/users/teachers').pipe(
      map(response => response.map((user: any) => ({
        id: user.id,
        name: user.name,
        email: user.email,
        roles: user.roles.map((role: any) => role.name)
      })))
    );
  }

  getStudentsByCourse(id: number, page: number, size: number, sortBy: string, sortDirection: string): Observable<StudentPage> {
    return this.paginationService.getPaginated<any>(`/api/teacher/courses/${id}/students`, page, size, sortBy, sortDirection).pipe(
      map(response => ({
        content: response.content.map(content => ({
          user: {
            id: content.user.id,
            name: content.user.name,
            email: content.user.email,
            roles: content.user.roles.map((role: any) => role.name)
          },
          grade: content.grade
        })),
        totalElements: response.totalElements
      }))
    );
  }

  create(user: CreateUser): Observable<User> {
    return this.http.post<User>('/api/admin/users', user);
  }

  update(userId: number, roles: string[]): Observable<User> {
    return this.http.put<User>(`/api/admin/users/${userId}`, { roles: roles });
  }

  changePassword(oldPassword: string, newPassword: string): Observable<{ success: boolean, message: string }> {
    return this.http.put<{ success: boolean, message: string }>('/api/user/me/change-password', { oldPassword: oldPassword, newPassword: newPassword });
  }

  remove(userId: number): Observable<{ success: boolean, message: string }> {
    return this.http.delete<{ success: boolean, message: string }>(`/api/admin/users/${userId}`);
  }

  downloadStudentCsv(courseId: number): void {
    this.http.get(`/api/teacher/courses/${courseId}/students/export`, {
      observe: 'response',
      responseType: 'blob'
    }).subscribe(response => {
      const contentDisposition = response.headers.get('Content-Disposition');
      let filename = 'students.csv'; // Default filename

      if (contentDisposition) {
        const matches = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/.exec(contentDisposition);
        if (matches != null && matches[1]) {
          filename = matches[1].replace(/['"]/g, '')
        }
      }
      saveAs(response.body!, filename);
    });
  }
}
