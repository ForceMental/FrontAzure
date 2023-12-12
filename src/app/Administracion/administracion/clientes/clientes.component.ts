import { Component, OnInit } from '@angular/core';
import { ClientesService } from './clientes.service';
import { Cliente } from './cliente.model';
import { MatDialog } from '@angular/material/dialog';
import { ClienteEditDialogComponent } from './cliente-edit-dialog/cliente-edit-dialog.component';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NuevoClienteDialogComponent } from './nuevo-cliente-dialog/nuevo-cliente-dialog.component';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {
  clientes: Cliente[] = [];
  columnasMostradas: string[] = ['nombre', 'apellido', 'telefono', 'correo_electronico', 'direccion', 'comuna', 'rut', 'acciones'];

  constructor(
    private clientesService: ClientesService,
    public dialog: MatDialog,
    private httpClient: HttpClient,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.cargarClientes();

  }

  cargarClientes(): void {
    this.clientesService.getClientes().subscribe(
      (data: any[]) => {
        this.clientes = data.map(item => {
          // Configura el objeto cliente
          const cliente: Cliente = {
            id: item.id,
            nombre: item.nombre,
            apellido: item.apellido,
            telefono: item.telefono,
            correo_electronico: item.correo_electronico,
            direccion: item.direccion,
            rut: item.rut,
            comuna: {
              nombre_comuna: item.comuna // Asumiendo que la API devuelve el nombre de la comuna
            },
            region: {
              nombre_region: item.region // Asumiendo que la API devuelve el nombre de la región
            }
          };
          return cliente;
        });
      },
      (error: HttpErrorResponse) => {
        console.error('Error al obtener los clientes:', error.message);
      }
    );

  }

  abrirDialogoEditar(cliente: Cliente): void {
    console.log("Cliente a editar:", cliente);
    const dialogRef = this.dialog.open(ClienteEditDialogComponent, {
      width: '250px',
      data: cliente
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log("Datos del cliente a actualizar:", result);
        this.actualizarCliente(result);
      }
    });
  }

  actualizarCliente(cliente: Cliente): void {
    console.log(cliente);
    this.clientesService.updateCliente(cliente).subscribe(
      updatedCliente => {
        const index = this.clientes.findIndex(c => c.id === updatedCliente.id);
        if (index !== -1) {
          this.clientes[index] = updatedCliente;
          console.log("Cliente actualizado con éxito:", updatedCliente);
        }
      },
      error => console.error('Error al actualizar cliente:', error)
    );
  }

  abrirDialogoNuevoCliente(): void {
    const dialogRef = this.dialog.open(NuevoClienteDialogComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.clientesService.addCliente(result).subscribe(
          nuevoCliente => {
            this.clientes.push(nuevoCliente);
            this.snackBar.open('Cliente agregado con éxito', 'Cerrar', { duration: 3000 });
          },

          error => {
            console.error('Error al agregar cliente:', error);
            this.snackBar.open('Error al agregar cliente', 'Cerrar', { duration: 3000 });
          }
        );
      }
    });
  }

  editarCliente(cliente: Cliente): void {
    // Validar si el cliente tiene un ID válido
    if (!cliente || typeof cliente.id !== 'number') {
      this.snackBar.open('Cliente inválido o no seleccionado', 'Cerrar', { duration: 3000 });
      return;
    }

    // Abrir el diálogo de edición con los datos del cliente seleccionado
    const dialogRef = this.dialog.open(ClienteEditDialogComponent, {
      width: '250px',
      data: cliente
    });

    // Manejar el cierre del diálogo
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Asegurarse de que comuna y region sean números (IDs)
        result.comuna = parseInt(result.comuna);
        result.region = parseInt(result.region);

        // Llamar al servicio para actualizar el cliente
        this.clientesService.updateCliente(result).subscribe(
          response => {
            this.cargarClientes();
            // Actualizar la lista de clientes
            const index = this.clientes.findIndex(c => c.id === response.id);
            if (index !== -1) {
              this.clientes[index] = response;
            }
            this.snackBar.open('Cliente actualizado con éxito', 'Cerrar', { duration: 3000 });
          },
          error => {
            console.error('Error al actualizar el cliente:', error);
            this.snackBar.open('Error al actualizar el cliente', 'Cerrar', { duration: 3000 });
          }
        );
      }

    });
  }


  eliminarCliente(cliente: Cliente): void {
    const confirmDialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { title: 'Confirmar Eliminación', message: `¿Estás seguro de que quieres eliminar a ${cliente.nombre}?` }
    });

    confirmDialogRef.afterClosed().subscribe(result => {
      if (result && cliente.id) {
        this.clientesService.deleteCliente(cliente.id).subscribe(
          () => {
            this.clientes = this.clientes.filter(c => c.id !== cliente.id);
            this.snackBar.open('Cliente eliminado con éxito', 'Cerrar', { duration: 3000 });
          },
          error => {
            console.error('Error al eliminar el cliente:', error);
            this.snackBar.open('Error al eliminar el cliente', 'Cerrar', { duration: 3000 });
          }
        );
      }
    });
  }

}
