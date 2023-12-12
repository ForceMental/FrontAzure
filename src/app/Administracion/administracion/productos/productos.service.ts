import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Producto } from './producto.model'; // crear un modelo para Producto

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  private apiUrl = 'https://gatewayforce.azure-api.net/api/productos/'; // Reemplaza con la URL de tu API real

  constructor(private http: HttpClient) {}

  // Obtener todos los productos
  getProductos(): Observable<Producto[]> {
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
      return this.http.get<Producto[]>(this.apiUrl, { headers });
    } else {
      // Handle the case where the access token is not available
      // You can throw an error or handle it based on your app's logic
      // For demonstration, this returns an empty observable
      return of([]);
    }
  }
  // Obtener un producto por ID
  // Crear un nuevo producto
  addProducto(producto: Producto): Observable<Producto> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post<Producto>('http://107.22.174.168:8020/api/productos/', producto, httpOptions);
  }

  // Actualizar un producto
  updateProducto(producto: Producto): Observable<Producto> {
    console.log(producto.id_producto);
    return this.http.put<Producto>(`${'http://107.22.174.168:8020/api/productos/'}${producto.id_producto}/`, producto);
  }

  // Eliminar un producto
  deleteProducto(id: number): Observable<Producto> {
    return this.http.delete<Producto>(`${'http://107.22.174.168:8020/api/productos/'}${id}`);
  }
}
