import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  obtenerDatosServiceVenta(): Observable<any> {
    const url = 'https://gatewayforce.azure-api.net/dashboard/api/service_venta';

    // Obtener el token del localStorage
    const token = localStorage.getItem('accessToken'); // Reemplaza 'tu_token' con la clave donde guardaste el token

    // Verificar si se encontró el token en el localStorage
    if (token) {
      // Agregar el token como encabezado de autorización
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });

      // Realizar la solicitud HTTP con los encabezados
      return this.http.get(url, { headers: headers });
    } else {
      // Manejar el caso donde no se encuentra el token en el localStorage
      console.error('Token no encontrado en el localStorage');
      // Puedes retornar un observable con un mensaje de error u otra lógica según tu necesidad
      return new Observable(observer => {
        observer.error('Token no encontrado en el localStorage');
      });
    }
  }

  obtenerDatosService(): Observable<any> {

    const url = 'https://gatewayforce.azure-api.net/dashboard/api/service';
    return this.http.get(url);
  }


}
