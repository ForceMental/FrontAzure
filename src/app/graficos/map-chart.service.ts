// map-chart.service.ts
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { DataService } from '../services/data.service';

@Injectable({
  providedIn: 'root',
})
export class MapChartService {
  grafico6: any[] = [];

  constructor(private service: DataService) {}

  getDefaultMapChartConfig(): any {

    return {
      view6: [1000, 400],
      gradient: true,
      showLegend: true,
      showLabels: true,
      isDoughnut: false,
      colorScheme: {
        domain: ['#0c2a5d', '#13999b','#4d7864','#60390d','#ffd962'],
      },
    };
  }

  getMapData(): Observable<any[]> {
    // Realiza la solicitud HTTP para obtener los datos de servicio
    return this.service.obtenerDatosService().pipe(
      map((data: any) => {
        const contadoresEmpleado = data.contadores_empleado;
        const chartData: any[] = [];

        for (const key in contadoresEmpleado) {
          if (contadoresEmpleado.hasOwnProperty(key)) {
            const name = key;
            const count = contadoresEmpleado[key];
            chartData.push({
              name: name,
              value: count
            });
          }
        }

        return chartData;
      })
    );
  }
}
