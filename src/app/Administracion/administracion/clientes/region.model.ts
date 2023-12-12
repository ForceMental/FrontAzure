// region.model.ts
export class Region {
    id?: number;
    nombre_region: string;
  
    constructor(init?: Partial<Region>) {
      Object.assign(this, init);
      this.nombre_region = init?.nombre_region ?? ''; // Asigna un valor por defecto si no se proporciona
    }
  }
  