import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import Papa from "papaparse";

export interface GradeListItem {
  id: number;
  name: string;
  grade: number;
}

@Injectable({
  providedIn: 'root'
})
export class GradeService {
  constructor(private http: HttpClient) { }

  gradeStudent(courseId: number, studentId: number, grade: number): Observable<{ success: boolean, message: string }> {
    return this.grade(courseId, [{studentId, grade}]);
  }

  loadStudentCsv(file: File): Promise<GradeListItem[]> {
    return new Promise<GradeListItem[]>((resolve, reject) => {
      Papa.parse(file, {
        header: true,
        worker: true,
        skipEmptyLines: true,
        complete: (res) => {
          const headers = res.meta.fields;
          if (!headers || !this.validateHeaders(headers)) {
            reject(new Error('Invalid headers'));
          }

          const result: GradeListItem[] = []

          for (let row of res.data as any[]) {
            if (!this.validateRow(row)) continue;

            result.push({id: row.id, name: row.name, grade: row.grade});
          }

          resolve(result);
        },
        error: (err) => {
          console.error(err.message);
          reject(err);
        }
      });
    });
  }

  gradeStudentBulk(courseId: number, grades: GradeListItem[]): Observable<{ success: boolean, message: string }> {
    return this.grade(courseId, grades.map(grade => { return { studentId: grade.id, grade: grade.grade }}));
  }

  private grade(courseId: number, grades: { studentId: number, grade: number}[]): Observable<{ success: boolean, message: string }> {
    return this.http.post<{ success: boolean, message: string }>(`/api/teacher/courses/${courseId}/grades`, { grades: grades.reduce((acc, grade) => {
      acc[grade.studentId] = grade.grade;
      return acc;
    }, {} as { [key: number]: number }) });
  }

  private validateHeaders(headers: string[]): boolean {
    const expectedHeaders = ["id", "name", "grade"];
    return expectedHeaders.every(header => headers.includes(header));
  }

  private validateRow(row: any): boolean {
    return !isNaN(row.id)
      && typeof row.name === 'string' && row.name.trim() !== ''
      && !isNaN(row.grade) && row.grade >= 1 && row.grade <= 5;
  }
}
