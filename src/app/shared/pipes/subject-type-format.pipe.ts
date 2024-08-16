import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  standalone: true,
  name: 'subjectTypeFormat'
})
export class SubjectTypeFormatPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    switch (value) {
      case 'PRACTICE':
        return 'Gyakorlat';
      case 'THEORY':
        return 'Előadás'
      default:
        return value;
    }
  }

}
