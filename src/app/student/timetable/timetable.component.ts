import { Component } from '@angular/core';
import {TimetableService, TimetableTile} from "../../shared/services/timetable.service";

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
  styleUrl: './timetable.component.scss'
})
export class TimetableComponent {
  tiles: TimetableTile[] = [];
  rowHeight: number = 60;

  constructor(private timetableService: TimetableService) {
  }

  ngOnInit() {
    this.timetableService.getTimetableTiles().then(
      response => {
        console.log(response);
        this.tiles = response.tiles;
        this.rowHeight /= response.interval;
      }
    );
  }

  getClass(id: string|undefined): string {
    switch (id) {
      case undefined: return '';
      case 'corner': return 'corner';
      case 'day': return 'day';
      case 'time': return 'time';
      case 'blank': return 'blank';
      default: return 'element';
    }
  }
}
