import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {map, Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class PaginationService {
  constructor(private http: HttpClient) {}

  getPaginated<T>(url: string, page: number, size: number, sortBy: string, sortDirection: string): Observable<{ content: T[], totalElements: number }> {
    let params = new HttpParams()
      .set("offset", page)
      .set("pageSize", size);

    if (sortDirection != '') {
      params = new HttpParams()
        .set("offset", page)
        .set("pageSize", size)
        .set("sortBy", `${sortBy},${sortDirection}`);
    }

    return this.http.get<{ content: T[], totalElements: number }>(url, { params }).pipe(
      map(response => ({
        content: response.content,
        totalElements: response.totalElements
      }))
    );
  }
}
