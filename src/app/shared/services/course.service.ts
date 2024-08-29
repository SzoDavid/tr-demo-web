import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Course} from "../schemas/course.schema";

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  constructor(private http: HttpClient) { }

  update(course: { id: number, capacity: number, teacherId: number }): Observable<Course> {
    return this.http.put<Course>(`/api/admin/courses/${course.id}`, {
      capacity: course.capacity,
      teacherId: course.teacherId
    });
  }

  remove(id: number): Observable<{ success: boolean, message: string }> {
    return this.http.delete<{ success: boolean, message: string }>(`/api/admin/courses/${id}`);
  }

  getTaken(page: number, size: number, sortBy: string, sortDirection: string): Observable<{ content: Course[], totalElements: number }> {
    let params = new HttpParams()
      .set("offset", page)
      .set("pageSize", size);

    if (sortDirection != '') {
      params = new HttpParams()
        .set("offset", page)
        .set("pageSize", size)
        .set("sortBy", `${sortBy},${sortDirection}`);
    }

    return this.http.get<{ content: Course[], totalElements: number }>('/api/student/taken-courses', { params }).pipe(
      map(response => ({
        content: response.content,
        totalElements: response.totalElements
      }))
    );
  }

  getTakenOfSubject(subjectId: number): Observable<Course> {
    return this.http.get<Course>(`/api/student/subject/${subjectId}/get-taken-course`);
  }

  registerCourse(id: number): Observable<{ success: boolean, message: string }> {
    return this.http.post<{ success: boolean, message: string }>(`/api/student/taken-courses`, id);
  }

  dropCourse(id: number): Observable<{ success: boolean, message: string }> {
    return this.http.delete<{ success: boolean, message: string }>(`/api/student/taken-courses/${id}`);
  }
}
