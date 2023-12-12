import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { DataService } from '../services/data.service';

@Injectable({
  providedIn: 'root',
})
export class NumberCardService {
  grafico5: any[] = [];
  constructor(private service: DataService) { }

  getNumberCardConfig(): any {
    return {
      view5: [1000, 400],
      scheme: {
        domain: ['#0c2a5d', '#13999b','#4d7864','#60390d','#ffd962'],
      },
      gradient: false,
      animations: true,
    };
  }

  getNumberCardData(): Observable<any[]> {
    return this.service.obtenerDatosServiceVenta().pipe(
      map((data: any) => {
        const conteoEjecutivoId = data.conteo_ejecutivo_id;
        const chartData: any[] = [];

        for (const key in conteoEjecutivoId) {
          if (conteoEjecutivoId.hasOwnProperty(key)) {
            const producto = conteoEjecutivoId[key];
            chartData.push({
              name: key, // Utiliza la clave como nombre
              value: producto
            });
          }
        }

        return chartData;
      })
    );
  }
}
