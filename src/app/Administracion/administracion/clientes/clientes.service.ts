import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { Cliente } from './cliente.model'; // modelo para Cliente
import { catchError } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  private apiUrl = 'http://107.22.174.168:8000/api/clientes'; // Reemplaza con la URL de tu API real

  constructor(private http: HttpClient) { }


  getClientes(): Observable<Cliente[]> {
    // Retrieve the access token from localStorage
    const accessToken = localStorage.getItem('accessToken');
    console.log(accessToken);
    // Ensure the access token exists before making the request
    if (accessToken) {
      // Set the access token in the Authorization header
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${accessToken}`
      });

      // Add the headers to the HTTP request
      return this.http.get<Cliente[]>('https://gatewayforce.azure-api.net/api/clientes/', { headers });
    } else {
      // Handle the case where the access token is not available
      // You can throw an error or handle it based on your app's logic
      // For demonstration, this returns an empty observable
      return of([]);
    }
  }

  // Obtener un cliente por ID
  getCliente(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.apiUrl}/${id}`);
  }

  // En ClientesService
  addCliente(cliente: Cliente): Observable<Cliente> {
    console.log("Enviando cliente:", cliente); // Depuración
    return this.http.post<Cliente>(`${this.apiUrl}/create/`, cliente).pipe(
      catchError(this.handleError)
    );
  }



  onSave(cliente: Cliente) {
    console.log("Cliente a actualizar:", cliente);
    // Resto del código...
  }


  // Actualizar un cliente
  updateCliente(cliente: Cliente): Observable<Cliente> {
    // Comprobación para asegurar que el cliente tiene un ID válido
    if (cliente && cliente.id) {
      // Realizar la solicitud PUT
      return this.http.put<Cliente>(`${'http://107.22.174.168:8000/api/clientes/update'}/${cliente.id}/`, cliente);
    } else {
      // Manejar el caso en el que el cliente no tiene un ID válido
      console.error('No se puede actualizar el cliente sin un ID válido');
      // Aquí puedes retornar un observable que indique el error
      return throwError("Cliente sin ID válido");
    }
  }




  // Eliminar un cliente
  deleteCliente(id: number): Observable<Cliente> {
    return this.http.delete<Cliente>(`${'https://gatewayforce.azure-api.net/cliente/api/clientes'}/${id}/`);
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    // Manejo de errores en el cliente, podrías personalizar esto aún más
    console.error(`Backend returned code ${error.status}, body was: `, error.error);
    return throwError(() => 'Something bad happened; please try again later.');
  }


}

