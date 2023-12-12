import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Cliente } from '../cliente.model';
import { ComunaService } from '../comuna.service';
import { RegionService } from '../region.service';

@Component({
  selector: 'app-cliente-edit-dialog',
  templateUrl: './cliente-edit-dialog.component.html',
  styleUrls: ['./cliente-edit-dialog.component.scss']
})
export class ClienteEditDialogComponent implements OnInit {
  editForm: FormGroup;
  comunas: any[] = [];
  regiones: any[] = [];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ClienteEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Cliente,
    private comunaService: ComunaService,
    private regionService: RegionService
  ) {
    // Inicializa el formulario con valores seguros
    this.editForm = this.fb.group({
      id: [data.id],
      nombre: [data.nombre, Validators.required],
      apellido: [data.apellido, Validators.required],
      telefono: [data.telefono, Validators.required],
      rut: [{value: data.rut, disabled: true}], // RUT deshabilitado
      correo_electronico: [data.correo_electronico, [Validators.required, Validators.email]],
      direccion: [data.direccion, Validators.required],
      comuna: [this.getSafeValue(data.comuna, 'id'), Validators.required],
      region: [this.getSafeValue(data.region, 'id'), Validators.required],
    });
  }

  ngOnInit(): void {
    // Cargar comunas y regiones como antes
    this.cargarComunas();
    this.cargarRegiones();
  }

  private getSafeValue(obj: any, prop: string): any {
    return obj && obj.hasOwnProperty(prop) ? obj[prop] : '';
  }

  cargarComunas(): void {
    this.comunaService.getComunas().subscribe(
      data => this.comunas = data,
      error => console.error('Error al cargar comunas', error)
    );
  }

  cargarRegiones(): void {
    this.regionService.getRegiones().subscribe(
      data => this.regiones = data,
      error => console.error('Error al cargar regiones', error)
    );
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    console.log('Valores del formulario:', this.editForm.value);
    console.log('Estado del formulario:', this.editForm.status);
  
    if (this.editForm.valid) {
      const formData = {
        ...this.editForm.value,
        rut: this.data.rut // Añade el RUT manualmente si está deshabilitado
      };
  
      // Enviar datos del formulario para actualización
      console.log('Datos a enviar:', formData);
      // Implementa la lógica para enviar los datos al servidor aquí
      this.dialogRef.close(formData);
    } else {
      console.error('Formulario no es válido');
      Object.keys(this.editForm.controls).forEach(key => {
        const control = this.editForm.get(key);
        if (control && control.errors) {
          Object.keys(control.errors).forEach(keyError => {
            console.error(`Error en ${key}: ${keyError}`, control.errors![keyError]);
          });
        }
      });
    }
  }
  
}  