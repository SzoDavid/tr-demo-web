import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Subject} from "../schemas/subject.schema";
import {map, Observable} from "rxjs";
import {CreateSubject} from "../schemas/create-subject.schema";

@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  constructor(private http: HttpClient) { }

  getAll(page: number, size: number, sortBy: string, sortDirection: string): Observable<{ content: Subject[], totalElements: number }> {
    let params = new HttpParams()
      .set("offset", page)
      .set("pageSize", size);

    if (sortDirection != '') {
      params = new HttpParams()
        .set("offset", page)
        .set("pageSize", size)
        .set("sortBy", `${sortBy},${sortDirection}`);
    }

    return this.http.get<{ content: Subject[], totalElements: number }>('/api/admin/subjects/', { params }).pipe(
      map(response => ({
        content: response.content,
        totalElements: response.totalElements
      }))
    );
  }

  get(id: number): Observable<Subject> {
    return this.http.get<Subject>(`/api/admin/subjects/${id}`);
  }

  create(subject: CreateSubject): Observable<Subject> {
    return this.http.post<Subject>('/api/admin/subjects/', subject);
  }

  update(id: number, subject: CreateSubject): Observable<Subject> {
    return this.http.put<Subject>(`/api/admin/subjects/${id}`, subject);
  }

  remove(id: number): Observable<{ success: boolean, message: string }> {
    return this.http.delete<{ success: boolean, message: string }>(`/api/admin/subjects/${id}`);
  }
}
