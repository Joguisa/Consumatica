import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ServiciosService } from '../../services/servicios.service';
import { UtilidadService } from 'src/app/shared/services/utilidad.service';
import { Servicio } from '../../interfaces/servicio';

@Component({
  selector: 'app-dialog-servicio',
  templateUrl: './dialog-servicio.component.html',
  styleUrls: ['./dialog-servicio.component.css'],
})
export class DialogServicioComponent implements OnInit {
  formServicio!: FormGroup;
  tituloAccion: string = 'Nuevo';
  botonAccion: string = 'Guardar';

  constructor(
    private dialogReference: MatDialogRef<DialogServicioComponent>,
    @Inject(MAT_DIALOG_DATA) public datosServicio: Servicio,
    private fb: FormBuilder,
    private _serviciosServicio: ServiciosService,
    private _utilidadServicio: UtilidadService
  ) {
    this.formServicio = this.fb.group({
      nombreServicio: ['', Validators.required],
    });
    if (this.datosServicio != null) {
      this.tituloAccion = 'Editar';
      this.botonAccion = 'Actualizar';
    }
  }

  ngOnInit(): void {
    if (this.datosServicio != null) {
      this.formServicio.patchValue({
        nombreServicio: this.datosServicio.nombreServicio,
      });
    }
  }

  addEditServicio() {
    const modelo: Servicio = {
      id: this.datosServicio == null ? 0 : this.datosServicio.id,
      nombreServicio: this.formServicio.value.nombreServicio,
      asignacionServicio: this.formServicio.value.asignacionServicio,
    };

    if (this.datosServicio == null) {
      this._serviciosServicio.addServicio(modelo).subscribe({
        next: (data) => {
          // if (data) {
          this._utilidadServicio.mostrarAlerta(
            'El servicio fue registrado',
            'Exito'
          );
          this.dialogReference.close('true');
          // } else
        },
        error: (e) => {
          this._utilidadServicio.mostrarAlerta(
            'No se pudo registrar el servicio',
            'Error'
          );
        },
      });
    } else {
      this._serviciosServicio.updatServicio(modelo, modelo.id).subscribe({
        next: (data) => {
          // if (data) {
          this._utilidadServicio.mostrarAlerta(
            'El servicio fue editado',
            'Exito'
          );
          this.dialogReference.close('true');
          // } else
        },
        error: (e) => {
          this._utilidadServicio.mostrarAlerta(
            'No se pudo editar el producto',
            'Error'
          );
        },
      });
    }
  }
}
