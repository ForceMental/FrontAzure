import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl,ValidatorFn } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ClientesService } from '../clientes.service';
import { ComunaService } from '../comuna.service'; // Asegúrate de tener este servicio

function rutValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const rut = control.value;
    if (!rut) {
      return null; // Si no hay RUT, no validar (se maneja con Validators.required)
    }

    // Separar cuerpo y dígito verificador
    const partes = rut.split('-');
    if (partes.length !== 2) {
      return { 'invalidRut': { value: rut } };
    }

    const cuerpo = partes[0];
    const dv = partes[1].toLowerCase();

    // Calcular Dígito Verificador
    let suma = 0;
    let multiplicador = 2;

    for (let i = cuerpo.length - 1; i >= 0; i--) {
      suma += multiplicador * parseInt(cuerpo.charAt(i));
      multiplicador = multiplicador === 7 ? 2 : multiplicador + 1;
    }

    const dvCalculado = 11 - (suma % 11);
    let dvEsperado = dvCalculado === 11 ? '0' : dvCalculado === 10 ? 'k' : dvCalculado.toString();

    // Comparar DV
    if (dv !== dvEsperado) {
      return { 'invalidRut': { value: rut } };
    }

    return null; // Si pasa la validación
  };
}




@Component({
  selector: 'app-nuevo-cliente-dialog',
  templateUrl: './nuevo-cliente-dialog.component.html'
})
export class NuevoClienteDialogComponent implements OnInit {
  nuevoClienteForm: FormGroup;
  comunas: any[] = [];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<NuevoClienteDialogComponent>,
    private clientesService: ClientesService,
    private comunaService: ComunaService // Servicio para cargar las comunas
  ) {
    this.nuevoClienteForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      telefono: ['', Validators.required],
      correo_electronico: ['', [Validators.required, Validators.email]],
      direccion: ['', Validators.required],
      rut: ['', [Validators.required, rutValidator()]],
      comuna: ['', Validators.required] // Comuna como un campo separado

    });
  }

  ngOnInit(): void {
    this.cargarComunas();
  }

  cargarComunas(): void {
    this.comunaService.getComunas().subscribe(
      comunas => {
        this.comunas = comunas;
        console.log(comunas);
      },
      error => console.error('Error al cargar comunas:', error)
    );
  }

  onSubmit(): void {
    if (this.nuevoClienteForm.valid) {
      const formData = this.nuevoClienteForm.value;

      // Asegurarse de que 'comuna' sea un ID numérico
      const comunaId = typeof formData.comuna === 'object' ? formData.comuna.id : formData.comuna;

      const clienteParaEnviar = {
        ...formData,
        comuna: comunaId
      };

      // Registro para depuración
      console.log("Datos del cliente a enviar:", clienteParaEnviar);

      this.clientesService.addCliente(clienteParaEnviar).subscribe({
        next: (clienteCreado) => {
          console.log('Cliente creado exitosamente:', clienteCreado);
          this.dialogRef.close(clienteCreado);
        },
        error: (error) => {
          console.error('Error al crear cliente:', error);
        }
      });
    } else {
      console.error('Formulario no es válido', this.nuevoClienteForm);
    }
  }




  onCancel(): void {
    this.dialogRef.close();
  }
}
