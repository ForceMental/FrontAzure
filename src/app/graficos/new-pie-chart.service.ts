// new-pie-chart.service.ts
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { DataService } from '../services/data.service';

@Injectable({
  providedIn: 'root'
})
export class NewPieChartService {
  grafico3: any[] = [];

  constructor(private service: DataService) {}

  getDefaultNewPieChartConfig(): any {

    return {
      view3: [700, 400],
      gradient: true,
      showLegend: true,
      showLabels: true,

      colorScheme: {
        domain: ['#0c2a5d', '#13999b','#4d7864','#60390d','#ffd962'],
      },
    };
  }

  getNewPieChartData(): Observable<any[]> {
    // Realiza la solicitud HTTP para obtener los datos de servicio
    return this.service.obtenerDatosService().pipe(
      map((data: any) => {
        const contadorReprogramadas = data.contador_reprogramadas;
        const chartData: any[] = [];

        for (const key in contadorReprogramadas) {
          if (contadorReprogramadas.hasOwnProperty(key)) {
            const status = key;
            const count = contadorReprogramadas[key];
            chartData.push({
              name: `${status === 'True' ? 'Reprogramadas' : 'No Reprogramadas'}`,
              value: count
            });
          }
        }

        return chartData;
      })
    );
  }
}
