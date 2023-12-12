import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-detalle-productos-dialog',
  templateUrl: './detalle-productos-dialog.component.html',
  styleUrls: ['./detalle-productos-dialog.component.scss']
})
export class DetalleProductosDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}

