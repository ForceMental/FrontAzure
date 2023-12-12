import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VentasService {
  private apiUrl = 'http://107.22.174.168:8030/api/ventas/'; // URL de tu API

  constructor(private http: HttpClient) { }

  getVentas(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  aprobarVenta(ventaId: number): Observable<any> {
    // Lógica para enviar una solicitud HTTP para aprobar la venta
    return this.http.post<any>(`${this.apiUrl}aprobar/${ventaId}/`, {}).pipe(
      catchError(this.handleError)
    );
  }

  cancelarVenta(ventaId: number): Observable<any> {
    // Lógica para enviar una solicitud HTTP para cancelar la venta
    return this.http.post<any>(`${this.apiUrl}cancelar/${ventaId}/`, {}).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError(error);
  }
}
