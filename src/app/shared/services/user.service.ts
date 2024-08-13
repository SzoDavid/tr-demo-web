import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {User} from "../schemas/user.schema";
import {CreateUser} from "../schemas/create-user.schema";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }

  getAll(page: number, size: number, sortBy: string, sortDirection: string): Observable<{ content: User[], totalElements: number }> {
    let params = new HttpParams()
      .set("offset", page)
      .set("pageSize", size);

    if (sortDirection != '') {
      params = new HttpParams()
        .set("offset", page)
        .set("pageSize", size)
        .set("sortBy", `${sortBy},${sortDirection}`);
    }

    return this.http.get<any>('/api/admin/users', { params }).pipe(
      map(response => ({
        content: response.content.map((user: any) => ({
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

  create(user: CreateUser): Observable<User> {
    return this.http.post<User>('/api/admin/users', user);
  }

  update(userId: number, roles: string[]): Observable<User> {
    return this.http.put<User>(`/api/admin/users/${userId}`, { roles: roles });
  }

  remove(userId: number): Observable<{ success: boolean, message: string }> {
    return this.http.delete<{ success: boolean, message: string }>(`/api/admin/users/${userId}`);
  }
}
