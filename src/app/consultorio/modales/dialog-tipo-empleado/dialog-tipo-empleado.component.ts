import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TipoEmpleado } from '../../interfaces/tipo-empleado';
import { TipoEmpleadoService } from '../../services/tipo-empleado.service';
import { UtilidadService } from 'src/app/shared/services/utilidad.service';

@Component({
  selector: 'app-dialog-tipo-empleado',
  templateUrl: './dialog-tipo-empleado.component.html',
  styleUrls: ['./dialog-tipo-empleado.component.css'],
})
export class DialogTipoEmpleadoComponent implements OnInit {
  formTipos!: FormGroup;
  tituloAccion: string = 'Nuevo';
  botonAccion: string = 'Guardar';

  constructor(
    private dialogReference: MatDialogRef<DialogTipoEmpleadoComponent>,
    @Inject(MAT_DIALOG_DATA) public dataTipoEmpleado: TipoEmpleado,
    private fb: FormBuilder,
    private _servicioTipoEmpleado: TipoEmpleadoService,
    private _utilidadServicio: UtilidadService
  ) {
    this.formTipos = this.fb.group({
      nombreTipo: ['', Validators.required],
    });
    if (this.dataTipoEmpleado != null) {
      this.tituloAccion = 'Editar';
      this.botonAccion = 'Actualizar';
    }
  }

  ngOnInit(): void {
    if (this.dataTipoEmpleado != null) {
      this.formTipos.patchValue({
        nombreTipo: this.dataTipoEmpleado.nombreTipo,
      });
    }
  }

  addEditTipoEmpleado() {
    const modelo: TipoEmpleado = {
      id: this.dataTipoEmpleado == null ? 0 : this.dataTipoEmpleado.id,
      nombreTipo: this.formTipos.value.nombreTipo,
      asignacionTipos: this.formTipos.value.asignacionTipos,
    };

    if (this.dataTipoEmpleado == null) {
      this._servicioTipoEmpleado.addTipos(modelo).subscribe({
        next: (data) => {
          // if (data) {
          this._utilidadServicio.mostrarAlerta(
            'El tipo empleado fue registrado',
            'Exito'
          );
          this.dialogReference.close('true');
          // } else
        },
        error: (e) => {
          this._utilidadServicio.mostrarAlerta(
            'No se pudo registrar el tipo empleado',
            'Error'
          );
        },
      });
    } else {
      this._servicioTipoEmpleado.updateTipos(modelo, modelo.id).subscribe({
        next: (data) => {
          // if (data) {
          this._utilidadServicio.mostrarAlerta(
            'El tipo empleado fue editado',
            'Exito'
          );
          this.dialogReference.close('true');
          // } else
        },
        error: (e) => {
          this._utilidadServicio.mostrarAlerta(
            'No se pudo editar el tipo empleado',
            'Error'
          );
        },
      });
    }
  }
}
