import { Component, OnInit } from '@angular/core';
import { VentasService } from './ventas.service';
import { Producto } from '../productos/producto.model';
import { MatDialog } from '@angular/material/dialog';
import { DetalleProductosDialogComponent } from '../productos/detalle-productos-dialog/detalle-productos-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.scss']
})
export class VentasComponent implements OnInit {
  ventas: any[] = []; // Tus datos de ventas originales
  ventasFiltradas: any[] = []; // Datos filtrados que se mostrarán en la tabla
  columnasMostradas: string[] = ['nombreCliente', 'productoVendido', 'estado', 'nombreEjecutivo','detalleProductos'];
  estadoSeleccionado: string = 'todos'; // Estado inicial del filtro

  constructor(
    private ventasService: VentasService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog // Inyecta MatDialog aquí
  ) {}

  ngOnInit(): void {
    this.cargarVentas();
  }

  abrirDialogoDetalleProductos(productos: any[]): void {
    const dialogRef = this.dialog.open(DetalleProductosDialogComponent, {
      width: '400px',
      data: { productos: productos }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('El diálogo fue cerrado');
    });
  }

  aprobarVenta(idVenta: number): void {
    this.ventasService.aprobarVenta(idVenta).subscribe({
      next: (ventaActualizada) => {
        // Mensaje de éxito para el usuario
        this.snackBar.open('Venta aprobada con éxito', 'Cerrar', { duration: 3000 });
        this.actualizarListaVentas(ventaActualizada); // Función para actualizar la lista de ventas
      },
      error: () => {
        // Mensaje de error para el usuario
        this.snackBar.open('Error al aprobar la venta. Por favor, intente de nuevo.', 'Cerrar', { duration: 3000 });
      }
    });
  }
  
  cancelarVenta(idVenta: number): void {
    this.ventasService.cancelarVenta(idVenta).subscribe({
      next: (ventaActualizada) => {
        // Mensaje de éxito para el usuario
        this.snackBar.open('Venta cancelada correctamente', 'Cerrar', { duration: 3000 });
        this.actualizarListaVentas(ventaActualizada); // Función para actualizar la lista de ventas
      },
      error: () => {
        // Mensaje de error para el usuario
        this.snackBar.open('Error al cancelar la venta. Por favor, intente de nuevo.', 'Cerrar', { duration: 3000 });
      }
    });
  }

  private actualizarListaVentas(ventaActualizada: any): void {
    // Encuentra el índice de la venta actualizada en la lista actual
    const index = this.ventas.findIndex(venta => venta.id === ventaActualizada.id);
  
    if (index !== -1) {
      // Si se encuentra, actualiza la venta en la lista
      this.ventas[index] = ventaActualizada;
    } else {
      // Si es una venta nueva, la agrega a la lista
      this.ventas.push(ventaActualizada);
    }
  
    // Filtra y actualiza la lista mostrada basándose en el estado seleccionado
    this.filtrarPorEstado(this.estadoSeleccionado);
  }

  cargarVentas(): void {
    this.ventasService.getVentas().subscribe((data: any[]) => {
      console.log(data)
      this.ventas = data.map(venta => ({
        ...venta,
        nombreCliente: venta.cliente_info ? `${venta.cliente_info.nombre} ${venta.cliente_info.apellido}` : 'N/A',
        cantidadProductos: this.obtenerCantidadDeProductos(venta.productos),
        estado: venta.estado_venta,
        nombreEjecutivo: `Ejecutivo ID: ${venta.ejecutivo_id}` // Aquí necesitas implementar la lógica para obtener el nombre real del ejecutivo
      }));
      this.ventasFiltradas = this.ventas;
    });
  }
  
  public obtenerCantidadDeProductos(productos: any[]): string {
    if (Array.isArray(productos) && productos.length > 0) {
      return productos.reduce((sum, current) => sum + current.cantidad, 0) + ' Productos';
    }
    return 'No Products';
  }
  
  
  

  

  filtrarPorEstado(estado: string): void {
    console.log('Filtrando por estado:', estado);
    this.estadoSeleccionado = estado;
    if (estado === 'todos') {
      this.ventasFiltradas = this.ventas;
    } else {
      this.ventasFiltradas = this.ventas.filter(venta => {
        console.log('Comparando:', venta.estado, 'con', estado);
        return venta.estado === estado;
      });
    }
    console.log('Ventas filtradas:', this.ventasFiltradas);
  }
  


  onEstadoSeleccionado(event: any): void {
    this.estadoSeleccionado = event.target.value;
    this.filtrarPorEstado(this.estadoSeleccionado); // Pasa el estado seleccionado
  }

}
