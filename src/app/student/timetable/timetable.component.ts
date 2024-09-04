import { Component } from '@angular/core';
import {TimetableService, TimetableTile} from "../../shared/services/timetable.service";
import { NgFor, NgClass, NgIf } from '@angular/common';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatTooltip } from '@angular/material/tooltip';
import { MatIconButton } from '@angular/material/button';

@Component({
    selector: 'app-timetable',
    templateUrl: './timetable.component.html',
    styleUrl: './timetable.component.scss',
    standalone: true,
    imports: [MatIconButton, MatTooltip, RouterLink, MatIcon, MatGridList, NgFor, MatGridTile, NgClass, NgIf]
})
export class TimetableComponent {
  tiles: TimetableTile[] = [];
  rowHeight: number = 60;

  constructor(private timetableService: TimetableService) {
  }

  ngOnInit() {
    this.timetableService.getTimetableTiles().then(
      response => {
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
