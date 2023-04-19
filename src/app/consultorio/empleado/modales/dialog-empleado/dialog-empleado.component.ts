import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { EmpleadoService } from '../../services/empleado.service';
import { UtilidadService } from 'src/app/shared/services/utilidad.service';
import { Empleado } from '../../interfaces/empleado';
import { forkJoin } from 'rxjs';
import { Servicio } from 'src/app/consultorio/servicios/interfaces/servicio';
import { TipoEmpleado } from 'src/app/consultorio/tipo-empleado/interfaces/tipo-empleado';
import { TipoEmpleadoService } from 'src/app/consultorio/tipo-empleado/services/tipo-empleado.service';
import { ServiciosService } from 'src/app/consultorio/servicios/services/servicios.service';
import { TransaccionService } from '../../services/transaccion.service';

@Component({
  selector: 'app-dialog-empleado',
  templateUrl: './dialog-empleado.component.html',
  styleUrls: ['./dialog-empleado.component.css'],
})
export class DialogEmpleadoComponent implements OnInit {
  formEmpleado!: FormGroup;
  tituloAccion: string = 'Nuevo';
  botonAccion: string = 'Guardar';
  empleados: Empleado[] = [];
  tipoServicios: Servicio[] = [];
  listaTipo: TipoEmpleado[] = [];
  idTipoEmpleado: number = 0;
  idServicio: number = 0;

  constructor(
    private dialogReference: MatDialogRef<DialogEmpleadoComponent>,
    private fb: FormBuilder,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public datosEmpleado: Empleado,
    private _empleadoService: EmpleadoService,
    private _tiposervice: TipoEmpleadoService,
    private _serviciosServicio: ServiciosService,
    private _utilidadServicio: UtilidadService,
    private _transaccionServicio: TransaccionService
  ) {
    this.formEmpleado = this.fb.group({
      cedula: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      // nombreTipo: ['', Validators.required],
      // nombreServicio: ['', Validators.required],
    });

    if (this.datosEmpleado != null) {
      this.tituloAccion = 'Editar';
      this.botonAccion = 'Actualizar';
    }

    this._tiposervice.getTipos().subscribe({
      next: (data) => {
        if (data) this.listaTipo = data;
      },
      error: (e) => {},
    });

    this._serviciosServicio.getServicios().subscribe({
      next: (data) => {
        if (data) this.tipoServicios = data;
      },
      error: (e) => {},
    });
  }

  get cedula() {
    return this.formEmpleado.get('cedula');
  }

  ngOnInit(): void {
    if (this.datosEmpleado != null) {
      this.formEmpleado.patchValue({
        cedula: this.datosEmpleado.cedula,
        nombres: this.datosEmpleado.nombres,
        apellidos: this.datosEmpleado.apellidos,
        nombreTipo: this.datosEmpleado.asignacion?.tipoEmpleado.nombreTipo, // para tipo empleado
        nombreServicio:
          this.datosEmpleado.servicio?.tipoServicio.nombreServicio,
      });
    }
  }

  addEditEmpleado() {
    const modelo: Empleado = {
      id: this.datosEmpleado == null ? 0 : this.datosEmpleado.id,
      cedula: this.formEmpleado.value.cedula,
      nombres: this.formEmpleado.value.nombres,
      apellidos: this.formEmpleado.value.apellidos,
      asignacion: {
        tipoEmpleado: this.formEmpleado.value.tipoEmpleado.nombreTipo,
      },

      servicio: {
        tipoServicio: this.formEmpleado.value.tipoServicio.nombreServicio,
      },
    };

    if (this.datosEmpleado == null) {
      this._empleadoService
        .addEmpleado(this.idTipoEmpleado, this.idServicio, modelo)
        .subscribe({
          next: (data) => {
            // if (data) {
            this._utilidadServicio.mostrarAlerta(
              'El paciente fue registrado',
              'Exito'
            );
            this.dialogReference.close('creado');
            // } else
          },
          error: (e) => {
            this._utilidadServicio.mostrarAlerta(
              'No se pudo registrar el paciente',
              'Error'
            );
          },
        });
    } else {
      this._empleadoService.updateEmpleado(modelo, modelo.id).subscribe({
        next: (data) => {
          // if (data) {
          this._utilidadServicio.mostrarAlerta(
            'El empleado fue editado',
            'Exito'
          );
          this.dialogReference.close('creado');
          // } else
        },
        error: (e) => {
          this._utilidadServicio.mostrarAlerta(
            'No se pudo editar el empleado',
            'Error'
          );
        },
      });
    }
  }
}
