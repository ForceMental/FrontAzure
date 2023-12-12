// comuna.model.ts
export class Comuna {
    id?: number;
    nombre_comuna: string;
  
    constructor(init?: Partial<Comuna>) {
      Object.assign(this, init);
      this.nombre_comuna = init?.nombre_comuna ?? ''; // Asigna un valor por defecto si no se proporciona
    }
  }
  