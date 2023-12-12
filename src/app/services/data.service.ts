import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  obtenerDatosServiceVenta(): Observable<any> {
    const url = 'https://forcemental.azure-api.net/dashboard/api/service_venta';

    return this.http.get(url);
  }

  obtenerDatosService(): Observable<any> {

    const url = 'https://forcemental.azure-api.net/dashboard/api/service';
    return this.http.get(url);
  }


}
