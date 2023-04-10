import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AsignacionTipoEmpleado } from '../../interfaces/asignacion-tipo-empleado';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { EmpleadoService } from '../../services/empleado.service';
import { TipoEmpleadoService } from '../../services/tipo-empleado.service';
import { UtilidadService } from 'src/app/shared/services/utilidad.service';
import { TipoEmpleado } from '../../interfaces/tipo-empleado';
import { Empleado } from '../../interfaces/empleado';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-dialog-empleado',
  templateUrl: './dialog-empleado.component.html',
  styleUrls: ['./dialog-empleado.component.css'],
})
export class DialogEmpleadoComponent implements OnInit {
  formEmpleado!: FormGroup;
  tituloAccion: string = 'Nuevo';
  botonAccion: string = 'Guardar';
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
    private _utilidadServicio: UtilidadService
  ) {
    this.formEmpleado = this.fb.group({
      cedula: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      nombreTipo: ['', Validators.required],
    });

    this._tiposervice.getTipos().subscribe({
      next: (data) => {
        if (data) this.listaTipo = data;
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
      });
    }
  }

  addEditEmpleado() {
    const modelo: any = {
      id: this.datosEmpleado == null ? 0 : this.datosEmpleado.id,
      cedula: this.formEmpleado.value.cedula,
      nombres: this.formEmpleado.value.nombres,
      apellidos: this.formEmpleado.value.apellidos,

      asignacion: {
        tipoEmpleado: {
          nombreTipo: this.formEmpleado.value.nombreTipo,
        },
      },

      servicio: {
        tipoServicio: this.formEmpleado.value.tipoServicio,
      },
    };

    if (this.datosEmpleado == null) {
      this._empleadoService.addEmpleado(modelo, this.idTipoEmpleado).subscribe({
        next: (data) => {
          // if (data) {
          this._utilidadServicio.mostrarAlerta(
            'El paciente fue registrado',
            'Exito'
          );
          this.dialogReference.close('true');
          // } else
        },
        error: (e) => {
          this._utilidadServicio.mostrarAlerta(
            'No se pudo registrar el paciente',
            'Error'
          );
        },
      });
    }
  }
}
