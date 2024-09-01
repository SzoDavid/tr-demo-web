import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {timetableConstants} from "../constants";

export interface TimetableTile {
  text: string|undefined;
  height: number;
  id: string|undefined;
}

interface TimetableElement {
  subjectId: number;
  name: string;
  startTime: string;
  endTime: string;
  diffInMinutes: number|undefined;
}

interface Timetable {
  [day: string]: TimetableElement[];
}

interface TimetableResponse {
  timetable: Timetable;
}

@Injectable({
  providedIn: 'root'
})
export class TimetableService {
  constructor(private http: HttpClient) { }

  getTimetableTiles(): Promise<{ tiles: TimetableTile[], interval: number }> {
    return new Promise<{ tiles: TimetableTile[], interval: number }>((resolve, reject) => {
      this.getTimetable().subscribe({
        next: (timetable: Timetable) => resolve(this.constructTiles(timetable)),
        error: (error) => reject(error)
      });
    });
  }

  private getTimetable(): Observable<Timetable> {
    return this.http.get<TimetableResponse>('/api/student/taken-courses/timetable').pipe(
      map(response => response.timetable),
    );
  }

  private constructTiles(timetable: Timetable): { tiles: TimetableTile[], interval: number } {
    const headers = this.generateHeaders(); // The first column is the times, this generates the list of them
    const interval = this.calculateGCDInterval(timetable); // Number of minutes a single row represents
    const length = (headers.length * 60) / interval; // Number of rows
    const jumps = Array(8).fill(0); // How much row needs to be skipped in each column
    const nextIndex = Array(7).fill(0); // What's the next timetable element that needs to be inserted in each column
    const hourHeight = 60 / interval; // How many rows do an hour fills in

    let result: TimetableTile[] = this.generateInitialTiles(hourHeight);

    for (let i = 0; i < length; i++) {
      this.processTimeColumn(i, jumps, headers, hourHeight, result);

      // Process the timetable elements
      for (let j = 1; j <= 7; j++) {
        // If the previous element is still present in the current row
        if ((jumps[j] - i) !== 0) continue;

        // If the day has no courses scheduled, insert a blank column
        if (!timetable[j]) {
          result.push({text: undefined, height: length, id: 'blank'});
          jumps[j] = length;
          continue;
        }

        // If there is no schedules left in the current day, fill the remaining space with a blank column
        if ((timetable[j][nextIndex[j-1]]) === undefined) {
          result.push({text: undefined, height: length - i, id: 'blank'});
          jumps[j] = length;
          continue;
        }

        const element = timetable[j][nextIndex[j-1]];

        // Calculate the rows before the current schedule from the start hour
        const diff = this.calculateMinutesBetween(element.startTime, `${timetableConstants.startHour}:00`) / interval;

        // If the next schedule hasn't started yet, add a blank column with the correct height
        if (diff !== i) {
          const height = nextIndex[j-1] === 0 ? diff : this.calculateMinutesBetween(element.startTime, timetable[j][nextIndex[j-1] - 1].endTime) / interval;

          result.push({text: undefined, height: height, id: 'blank'});
          jumps[j] += height;
          continue;
        }

        nextIndex[j-1]++;

        let height = element.diffInMinutes! / interval;
        jumps[j] += height;
        result.push({ text: `${element.name}\n${element.startTime}-${element.endTime}`, height: height, id: element.subjectId.toString() });
      }
    }

    return { tiles: result, interval: hourHeight};
  }

  private generateHeaders(): string[] {
    return Array.from({length: timetableConstants.endHour - timetableConstants.startHour + 1},
      (_, i) => `${timetableConstants.startHour + i}:00`);
  }

  // Calculates how many minutes should a row in the table represent to minimize the number of rows
  private calculateGCDInterval(timetable: Timetable): number {
    let interval = 60; // The hour columns in the side are made from 60 minute tall elements

    for (const day in timetable) {
      for (const element of timetable[day]) {
        element.diffInMinutes = this.calculateMinutesBetween(element.endTime, element.startTime);
        interval = this.gcd(interval, element.diffInMinutes);
      }
    }
    return interval;
  }

  private generateInitialTiles(hourHeight: number): TimetableTile[] {
    return [
      {text: undefined, height: hourHeight, id: 'corner'},
      {text: 'Hétfő', height: hourHeight, id: 'day'},
      {text: 'Kedd', height: hourHeight, id: 'day'},
      {text: 'Szerda', height: hourHeight, id: 'day'},
      {text: 'Csütörtök', height: hourHeight, id: 'day'},
      {text: 'Péntek', height: hourHeight, id: 'day'},
      {text: 'Szombat', height: hourHeight, id: 'day'},
      {text: 'Vasárnap', height: hourHeight, id: 'day'}
    ];
  }

  private processTimeColumn(i: number, jumps: number[], headers: string[],  hourHeight: number, result: TimetableTile[]): void {
    if ((jumps[0] - i) !== 0) return;

    result.push({ text: headers[Math.floor(i / hourHeight)], height: hourHeight, id: 'time' });
    jumps[0] += hourHeight;
  }

  private calculateMinutesBetween(time1: string, time2: string): number {
    const [hours1, minutes1] = time1.split(':').map(Number);
    const [hours2, minutes2] = time2.split(':').map(Number);

    return Math.abs((hours2 * 60 + minutes2) - (hours1 * 60 + minutes1));
  }

  private gcd(a: number, b: number): number {
    if (!b) {
      return a;
    }

    return this.gcd(b, a % b);
  }
}
