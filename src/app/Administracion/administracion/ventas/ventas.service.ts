import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class VentasService {
  private apiUrl = 'https://gatewayforce.azure-api.net/ventas/api/ventas/'; // URL de tu API

  constructor(private http: HttpClient) { }

  getVentas(): Observable<any[]> {
    const token = localStorage.getItem('accessToken'); // Obtener el token del localStorage
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` // Agregar el token al encabezado de la solicitud
    });

    return this.http.get<any[]>('https://gatewayforce.azure-api.net/api/obtener_ventas/', { headers }).pipe(
      catchError(this.handleError)
    );
  }

  aprobarVenta(ventaId: number): Observable<any> {
    // Lógica para enviar una solicitud HTTP para aprobar la venta
    return this.http.put<any>(`${this.apiUrl}aprobar/${ventaId}/`, {}).pipe(
      catchError(this.handleError)
    );
  }

  cancelarVenta(ventaId: number): Observable<any> {
    // Lógica para enviar una solicitud HTTP para cancelar la venta
    return this.http.put<any>(`${this.apiUrl}cancelar/${ventaId}/`, {}).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError(error);
  }
}
