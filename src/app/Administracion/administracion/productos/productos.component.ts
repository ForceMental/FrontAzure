// productos.component.ts
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProductosService } from './productos.service';
import { Producto } from './producto.model';
import { ProductoEditDialogComponent } from './producto-edit-dialog/producto-edit-dialog.component'; // Asegúrate de tener este componente para editar productos

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit {
  productos: any;

  constructor(
    private productosService: ProductosService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.cargarProductos();
  }

  cargarProductos() {
    this.productosService.getProductos().subscribe({
      next: (data) => {
        this.productos = data;
      },
      error: (error) => {
        console.error('Error al cargar productos', error);
      }
    });
  }

  nuevoProducto() {
    // Aquí podrías abrir un diálogo para crear un nuevo producto o navegar a una ruta diferente
    const dialogRef = this.dialog.open(ProductoEditDialogComponent, {
      width: '250px',
      data: { producto: {} as Producto } // Pasar un nuevo objeto Producto
    });

    dialogRef.afterClosed().subscribe((result) => {
      const producto: Producto = {
        nombre_producto: result.nombre,
        stock_producto: result.stock,
        categoria:  1
      }
      console.log(producto);
      if (result) {
        this.productosService.addProducto(producto).subscribe(() => {
          this.cargarProductos(); // Recargar la lista de productos
        });
      }
    });
  }

  editarProducto(producto: Producto) {
    const dialogRef = this.dialog.open(ProductoEditDialogComponent, {
      width: '250px',
      data: { producto } // Pasar el objeto Producto existente
    });

    dialogRef.afterClosed().subscribe((result) => {
      const product: Producto = {
        id_producto: producto.id_producto,
        nombre_producto: result.nombre,
        stock_producto: result.stock,
        categoria:  1
      }

      if (result) {
        this.productosService.updateProducto(product).subscribe(() => {
          this.cargarProductos(); // Recargar la lista de productos
        });
      }
    });
  }

  eliminarProducto(id: number) {
    // Confirmar eliminación antes de realizarla
    console.log(id);
    if (confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      this.productosService.deleteProducto(id).subscribe(() => {
        this.cargarProductos(); // Recargar la lista de productos
      });
    }
  }
}
