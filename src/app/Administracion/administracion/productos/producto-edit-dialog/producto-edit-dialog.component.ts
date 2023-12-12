// producto-edit-dialog.component.ts
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Producto } from '../producto.model';

@Component({
  selector: 'app-producto-edit-dialog',
  templateUrl: './producto-edit-dialog.component.html',
  styleUrls: ['./producto-edit-dialog.component.scss']
})
export class ProductoEditDialogComponent {
  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ProductoEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { producto: Producto }
  ) {
    // Inicializa el formulario con los datos del producto o vacío si es nuevo
    this.form = new FormGroup({
      nombre: new FormControl(this.data.producto?.nombre_producto || '', ),
      stock: new FormControl(this.data.producto?.stock_producto || ''),
      // ... otros campos del producto
    });
  }

  onNoClick(): void {
    this.dialogRef.close(); // Cierra el diálogo sin hacer nada
  }

  onSave(): void {
    if (this.form.valid) {
      // Pasa el producto actualizado o nuevo al componente padre
      this.dialogRef.close(this.form.value);
    }
  }
}
