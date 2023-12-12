import { Comuna } from './comuna.model';
import { Region } from './region.model';

export class Cliente {
  id?: number;
  nombre: string = '';
  apellido: string = '';
  telefono: string = '';
  correo_electronico: string = '';
  direccion: string = '';
  rut: string = '';
  comuna?: Comuna | null = null;
  region?: Region | null = null;

  constructor(init?: Partial<Cliente>) {
    if (init) {
      Object.assign(this, init);

      // Si 'comuna' es parte de los datos iniciales y es un objeto, instanciar Comuna
      if (typeof init.comuna === 'number') {
        this.comuna = init.comuna;
      }
      
      if (typeof init.region === 'number') {
        this.region = init.region;
      }
      
    }
  }
}
