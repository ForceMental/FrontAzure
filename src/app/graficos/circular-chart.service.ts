import { Injectable } from '@angular/core';
import { DataService } from '../services/data.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CircularChartService {
  grafico1: any[] = [];
  constructor(private service: DataService){

  }

  getDefaultCircularChartConfig(): any {
    // Configuración predeterminada para el gráfico circular
    return {
      view1: [1000, 400],
      gradient: true,
      showLegend: true,
      showLabels: true,
      isDoughnut: false,
      colorScheme: {
        domain: ['#0c2a5d', '#13999b','#4d7864','#60390d','#ffd962'],
      },
    };
  }



  getSampleChartData(): Observable<any[]> {
    return this.service.obtenerDatosServiceVenta().pipe(
      map((datos: any) => {
        return [
          { name: 'Aprobada', value: datos.conteo_estado_venta.A },
          { name: 'Pendiente', value: datos.conteo_estado_venta.P },
          { name: 'Cancelada', value: datos.conteo_estado_venta.C },
        ];
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('Error en la solicitud GET:', error);
        if (error instanceof HttpErrorResponse) {
          console.error('Estado:', error.status);
          console.error('Texto del estado:', error.statusText);
          console.error('Mensaje:', error.message);
        }
        return of([]);
      })
    );
  }
}
