import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import * as moment from 'moment';
import { UtilidadService } from 'src/app/shared/services/utilidad.service';
import { AsignarTurnoService } from '../../services/asignar-turno.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AsignarTurnos } from '../../interfaces/asignar-turnos';
import { ServiciosService } from '../../services/servicios.service';
import { Servicio } from '../../interfaces/servicio';

@Component({
  selector: 'app-asignar-turno',
  templateUrl: './asignar-turno.component.html',
  styleUrls: ['./asignar-turno.component.css'],
  providers: [{ provide: MAT_DATE_FORMATS, useValue: MAT_DATE_FORMATS }],
})
export class AsignarTurnoComponent implements OnInit {
  formTurno!: FormGroup;
  listaServicios: Servicio[] = [];

  // const horaConsulta = moment(this.formTurno.value.fechaInicio).format('DD/MM/YYYY');

  constructor(
    private fb: FormBuilder,
    private _asignarTurno: AsignarTurnoService,
    @Inject(MAT_DIALOG_DATA) public datosTurnos: AsignarTurnos,
    private _serviciosServicio: ServiciosService,
    private dateAdapter: DateAdapter<Date>,
    private _utilidadServicio: UtilidadService
  ) {
    this.formTurno = this.fb.group({
      cedula: ['', Validators.required],
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      horaConsulta: ['', Validators.required],
      nombreServicio: ['', Validators.required],
    });

    this._serviciosServicio.getServicios().subscribe({
      next: (data) => {
        if (data) this.listaServicios = data;
      },
      error: (e) => {},
    });
  }

  ngOnInit(): void {
    if (this.datosTurnos != null) {
      this.formTurno.patchValue({
        cedula: this.datosTurnos.paciente,
        nombres: this.datosTurnos.paciente,
        apellidos: this.datosTurnos.paciente,
        horaConsulta: this.datosTurnos.horaConsulta,
        nombreServicio: this.datosTurnos.servicioEmpleado,
        // nombreServicio: this.datosTurnos.servicioEmpleado.tipoServicio.nombreServicio
      });
    }
  }

  agendar() {
    const modelo: AsignarTurnos = {
      id: this.datosTurnos == null ? 0 : this.datosTurnos.id,
      pacienteId: this.datosTurnos == null ? 0 : this.datosTurnos.pacienteId,
      asignacionTipoServicioId:
        this.datosTurnos == null
          ? 0
          : this.datosTurnos.asignacionTipoServicioId,

      paciente: {
        nombres: this.formTurno.value.nombres,
        apellidos: this.formTurno.value.apellidos,
        cedula: this.formTurno.value.cedula,
      },
      servicioEmpleado: {
        empleado: {
          nombres: this.formTurno.value.nombres,
          apellidos: this.formTurno.value.apellidos,
          cedula: this.formTurno.value.cedulaEmpleado,
        },
        tipoServicio: {
          nombreServicio: this.formTurno.value.nombreServicio,
        },
      },
      horaConsulta: new Date(
        this.formTurno.value.fechaConsulta +
          ' ' +
          this.formTurno.value.horaConsulta
      ),
    };

    if (this.datosTurnos == null) {
      this._asignarTurno.addTurnos(modelo).subscribe({
        next: (data) => {
          // if (data) {
          this._utilidadServicio.mostrarAlerta(
            'La cita fue registrada',
            'Gracias'
          );
          // } else
          this._utilidadServicio.mostrarAlerta(
            'No se pudo registrar la cita',
            'Error'
          );
        },
        error: (e) => {},
      });
    } else {
      // método de editar, falta crear método en el servicio
    }

    // this._asignarTurno.addTurnos(modelo).subscribe((respuesta) => {
    //   console.log(respuesta);
    // });
  }
}
