import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Course} from "../schemas/course.schema";
import {PaginationService} from "./pagination.service";

export interface CoursePage {
  content: Course[],
  totalElements: number
}

export interface TakenCourse {
  course: Course,
  grade: number|undefined
}

export interface TakenCoursePage {
  content: TakenCourse[],
  totalElements: number
}

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  constructor(private http: HttpClient,
              private paginationService: PaginationService) { }

  update(course: { id: number, capacity: number, teacherId: number, schedule: { day: number, startTime: string, endTime: string } }): Observable<Course> {
    return this.http.put<Course>(`/api/admin/courses/${course.id}`, {
      capacity: course.capacity,
      teacherId: course.teacherId,
      schedule: course.schedule
    });
  }

  remove(id: number): Observable<{ success: boolean, message: string }> {
    return this.http.delete<{ success: boolean, message: string }>(`/api/admin/courses/${id}`);
  }

  getTaken(page: number, size: number, sortBy: string, sortDirection: string): Observable<TakenCoursePage> {
    return this.paginationService.getPaginated<TakenCourse>('/api/student/taken-courses', page, size, sortBy, sortDirection);
  }

  getTakenOfSubject(subjectId: number): Observable<Course> {
    return this.http.get<Course>(`/api/student/subject/${subjectId}/get-taken-course`);
  }

  getAssigned(page: number, size: number, sortBy: string, sortDirection: string): Observable<CoursePage> {
    return this.paginationService.getPaginated<Course>('/api/teacher/courses', page, size, sortBy, sortDirection);
  }

  getAssignedById(id: number): Observable<Course> {
    return this.http.get<Course>(`/api/teacher/courses/${id}`);
  }

  registerCourse(id: number): Observable<{ success: boolean, message: string }> {
    return this.http.post<{ success: boolean, message: string }>(`/api/student/taken-courses`, id);
  }

  dropCourse(id: number): Observable<{ success: boolean, message: string }> {
    return this.http.delete<{ success: boolean, message: string }>(`/api/student/taken-courses/${id}`);
  }
}
