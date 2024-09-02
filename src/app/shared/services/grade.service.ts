import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class GradeService {
  constructor(private http: HttpClient) { }

  gradeStudent(courseId: number, studentId: number, grade: number): Observable<{ success: boolean, message: string }> {
    return this.grade(courseId, [{studentId, grade}]);
  }

  gradeStudentBulk(courseId: number, file: File) {
    const reader = new FileReader();

    reader.onload = (e: any) => {
      const csv = e.target.result;

    }

    reader.readAsDataURL(file);
  }

  private grade(courseId: number, grades: { studentId: number, grade: number}[]): Observable<{ success: boolean, message: string }> {
    return this.http.post<{ success: boolean, message: string }>(`/api/teacher/courses/${courseId}/grades`, { grades: grades.reduce((acc, grade) => {
      acc[grade.studentId] = grade.grade;
      return acc;
    }, {} as { [key: number]: number }) });
  }
}
