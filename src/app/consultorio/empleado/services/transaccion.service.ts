import { Injectable } from '@angular/core';

import { map } from 'rxjs/operators';

import { Empleado } from '../interfaces/empleado';
import { Servicio } from '../../servicios/interfaces/servicio';
import { TipoEmpleado } from '../../tipo-empleado/interfaces/tipo-empleado';
import { Observable, catchError, forkJoin } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { EmpleadoService } from './empleado.service';
import { TipoEmpleadoService } from '../../tipo-empleado/services/tipo-empleado.service';
import { ServiciosService } from '../../servicios/services/servicios.service';

@Injectable({
  providedIn: 'root',
})
export class TransaccionService {
  private endPoint: string = environment.endPoint;
  private apiUrl: string = this.endPoint + 'api/';

  constructor(
    private http: HttpClient,
    private _empleadoService: EmpleadoService,
    private _tiposervice: TipoEmpleadoService,
    private _serviciosServicio: ServiciosService
  ) {}

  // updateSuperEmpelado(data: {empleado: Empleado; servicio: Servicio; tipoEmpleado: TipoEmpleado;}): Observable<any> {
  //   const empleadoUpdate$ = this._empleadoService.updateEmpleado(
  //     data.empleado,
  //     data.empleado.id
  //   );
  //   const tipoEmpleadoUpdate$ = this._tiposervice.updateTipos(
  //     data.tipoEmpleado,
  //     data.tipoEmpleado.id
  //   );
  //   const servicioUpdate$ = this._serviciosServicio.updatServicio(
  //     data.servicio,
  //     data.servicio.id
  //   );

  //   return forkJoin([
  //     empleadoUpdate$,
  //     tipoEmpleadoUpdate$,
  //     servicioUpdate$,
  //   ]).pipe(
  //     catchError((error) => {
  //       console.error('Error al realizar la transacción', error);
  //       return [];
  //     })
  //   );
  // }
}
