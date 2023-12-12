import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'; // Importa map de 'rxjs/operators'
import { DataService } from '../services/data.service';

@Injectable({
  providedIn: 'root',
})
export class PieChartService {
  grafico2: any[] = [];
  constructor(private service: DataService) { }

  getPieChartConfig(): any {
    return {
      view2: [1000, 400],
      gradient: false, // Quita la declaración de tipo boolean
      animations: true,

      colorScheme: {
        domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
      }
    };
  }

  getPieData(): Observable<any[]> {
    // Realiza la solicitud HTTP para obtener los datos de servicio_venta
    return this.service.obtenerDatosService().pipe(
      map((data: any) => {
        // Accede a los datos del contador_finalizada
        const contadorFinalizada = data.contador_finalizada;

        // Formatea los datos para el gráfico de acuerdo a tus necesidades
        const chartData: any[] = [];

        for (const key in contadorFinalizada) {
          if (contadorFinalizada.hasOwnProperty(key)) {
            const status = key === "True" ? "Completado" : "No Completado";
            const count = contadorFinalizada[key];
            chartData.push({
              name: status,
              value: count
            });
          }
        }

        return chartData;
      })
    );
  }
}
