import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UtilidadService } from 'src/app/shared/services/utilidad.service';
import { PacienteService } from '../../services/paciente.service';
import { Paciente } from '../../interfaces/paciente';

@Component({
  selector: 'app-dialog-paciente',
  templateUrl: './dialog-paciente.component.html',
  styleUrls: ['./dialog-paciente.component.css'],
})
export class DialogPacienteComponent implements OnInit {
  formPaciente!: FormGroup;
  tituloAccion: string = 'Nuevo';
  botonAccion: string = 'Guardar';

  constructor(
    private dialogReference: MatDialogRef<DialogPacienteComponent>,
    @Inject(MAT_DIALOG_DATA) public datosPaciente: Paciente,
    private fb: FormBuilder,
    private _pacienteService: PacienteService,
    private _utilidadServicio: UtilidadService
  ) {
    this.formPaciente = this.fb.group({
      cedula: ['', Validators.required],
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
    });

    if (this.datosPaciente != null) {
      this.tituloAccion = 'Editar';
      this.botonAccion = 'Actualizar';
    }
  }

  ngOnInit(): void {
    if (this.datosPaciente != null) {
      this.formPaciente.patchValue({
        cedula: this.datosPaciente.cedula,
        nombres: this.datosPaciente.nombres,
        apellidos: this.datosPaciente.apellidos,
      });
    }
  }

  addEditPaciente() {
    const modelo: Paciente = {
      id: this.datosPaciente == null ? 0 : this.datosPaciente.id,
      cedula: this.formPaciente.value.cedula,
      nombres: this.formPaciente.value.nombres,
      apellidos: this.formPaciente.value.apellidos,
    };

    if (this.datosPaciente == null) {
      this._pacienteService.addPaciente(modelo).subscribe({
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
    } else {
      this._pacienteService.updatePaciente(modelo, modelo.id).subscribe({
        next: (data) => {
          // if (data) {
          this._utilidadServicio.mostrarAlerta(
            'El paciente fue editado',
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
