import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Empleado } from '../interfaces/empleado';

@Injectable({
  providedIn: 'root',
})
export class EmpleadoService {
  private endPoint: string = environment.endPoint;
  private apiUrl: string = this.endPoint + 'api/';

  constructor(private http: HttpClient) {}

  getEmpleado(): Observable<Empleado[]> {
    return this.http.get<Empleado[]>(`${this.apiUrl}empleados`);
  }

  addEmpleado(
    idTipoEmpleado: number,
    idServicio: number,
    modelo: Empleado
  ): Observable<Empleado> {
    return this.http.post<Empleado>(
      `${this.apiUrl}empleados?id_tipo_empleado=${idTipoEmpleado}&id_servicio=${idServicio}`,
      modelo
    );
  }

  updateEmpleado(modelo: Empleado, id: number): Observable<Empleado> {
    return this.http.put<Empleado>(`${this.apiUrl}empleados/${id}`, modelo);
  }

  deleteEmpleado(idEmpleado: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}empleados/${idEmpleado}`);
  }
}
