import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'roleFormat'
})
export class RoleFormatPipe implements PipeTransform {

  transform(value: string[], ...args: unknown[]): string {
    if (!value || !Array.isArray(value)) {
      return '';
    }

    return value.map(role => {
      switch (role) {
        case 'ROLE_ADMIN':
          return 'adminisztrátor';
        case 'ROLE_STUDENT':
          return 'tanuló';
        case 'ROLE_TEACHER':
          return 'tanár';
        default:
          return role;
      }
    }).join(', ');
  }

}
