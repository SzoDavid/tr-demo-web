import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
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
}
