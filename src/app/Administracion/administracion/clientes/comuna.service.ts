import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ComunaService {
  private apiUrl = 'http://107.22.174.168:8000/api/comunas/'; // Ajusta esta URL

  constructor(private http: HttpClient) { }

  getComunas(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Error del cliente, como una red o un error de CORS.
      console.error('Error del cliente:', error.error.message);
    } else {
      // El servidor devolvió una respuesta no exitosa.
      console.error(`Código de error del servidor: ${error.status}, ${error.statusText}`);
      console.error('Cuerpo del error:', error.error);
    }
    // Devuelve un observable con un mensaje de error legible.
    return throwError('Ocurrió un error al cargar las comunas. Por favor, inténtalo de nuevo más tarde.');
  }
}
