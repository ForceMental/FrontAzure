import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-administracion',
  templateUrl: './administracion.component.html',
  styleUrls: ['./administracion.component.scss']
})
export class AdministracionComponent {
  constructor(private router: Router) {}

// Método para navegar
navigateToClientes() {
  this.router.navigate(['/administracion/clientes']);
}

navigateToProductos() {
  this.router.navigate(['/administracion/productos']);
}
}
