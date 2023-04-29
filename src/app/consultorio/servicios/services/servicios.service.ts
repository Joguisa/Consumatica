import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, catchError } from 'rxjs';
import { Servicio } from '../interfaces/servicio';

@Injectable({
  providedIn: 'root',
})
export class ServiciosService {
  private endPoint: string = environment.endPoint;
  private apiUrl: string = this.endPoint + 'api/';

  constructor(private http: HttpClient) {}

  getServicios(): Observable<Servicio[]> {
    return this.http.get<Servicio[]>(`${this.apiUrl}servicios`).pipe(
      catchError(error => {
        console.error(error, 'Error al obtener la lista de servicios');
      throw error; // Lanza el error para que sea manejado por el interceptor de errores
      })
    );;
  }

  addServicio(modelo: Servicio): Observable<Servicio> {
    return this.http.post<Servicio>(`${this.apiUrl}servicios`, modelo);
  }

  updatServicio(modelo: Servicio, id: number): Observable<Servicio> {
    return this.http.put<Servicio>(`${this.apiUrl}servicios/${id}`, modelo);
  }

  deleteServicio(id: number): Observable<Servicio> {
    return this.http.delete<Servicio>(`${this.apiUrl}servicios/${id}`);
  }
}
