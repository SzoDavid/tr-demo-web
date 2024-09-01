import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Subject} from "../schemas/subject.schema";
import {Observable} from "rxjs";
import {CreateSubject} from "../schemas/create-subject.schema";
import {PaginationService} from "./pagination.service";

export interface SubjectPage {
  content: Subject[],
  totalElements: number
}

@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  constructor(private http: HttpClient,
              private paginationService: PaginationService) { }

  getAll(page: number, size: number, sortBy: string, sortDirection: string): Observable<SubjectPage> {
    return this.paginationService.getPaginated<Subject>('/api/admin/subjects', page, size, sortBy, sortDirection);
  }

  getAvailable(page: number, size: number, sortBy: string, sortDirection: string): Observable<SubjectPage> {
    return this.paginationService.getPaginated<Subject>('/api/student/available', page, size, sortBy, sortDirection);
  }

  get(id: number): Observable<Subject> {
    return this.http.get<Subject>(`/api/admin/subjects/${id}`);
  }

  create(subject: CreateSubject): Observable<Subject> {
    return this.http.post<Subject>('/api/admin/subjects', subject);
  }

  update(id: number, subject: CreateSubject): Observable<Subject> {
    return this.http.put<Subject>(`/api/admin/subjects/${id}`, subject);
  }

  addCourse(subjectId: number, course: { capacity: number, teacherId: number, schedule: { day: number, startTime: string, endTime: string } }): Observable<Subject> {
    return this.http.post<Subject>(`/api/admin/subjects/${subjectId}/courses`, course);
  }

  remove(id: number): Observable<{ success: boolean, message: string }> {
    return this.http.delete<{ success: boolean, message: string }>(`/api/admin/subjects/${id}`);
  }
}
