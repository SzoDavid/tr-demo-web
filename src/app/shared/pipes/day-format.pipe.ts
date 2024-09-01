import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  standalone: true,
  name: 'dayFormat'
})
export class DayFormatPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): string {
    switch (value) {
      case 1:
        return 'Hétfő';
      case 2:
        return 'Kedd';
      case 3:
        return 'Szerda';
      case 4:
        return 'Csütörtök';
      case 5:
        return 'Péntek';
      case 6:
        return 'Szombat';
      case 7:
        return 'Vasárnap';
      default:
        return value.toString();
    }
  }
}
