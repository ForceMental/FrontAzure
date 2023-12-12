import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'translateEstado'
})
export class TranslateEstadoPipe implements PipeTransform {
  transform(value: string): string {
    switch (value) {
      case 'A':
        return 'Aprobada';
      case 'P':
        return 'Pendiente';
      case 'C':
        return 'Cancelada';
      default:
        return 'Desconocido';
    }
  }
}
