import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { AsignarTurnos } from '../interfaces/asignar-turnos';

@Injectable({
  providedIn: 'root',
})
export class AsignarTurnoService {
  private endPoint: string = environment.endPoint;
  private apiUrl: string = this.endPoint + 'api/';

  constructor(private http: HttpClient) {}

  addTurnos(modelo: AsignarTurnos): Observable<AsignarTurnos> {
    return this.http.post<AsignarTurnos>(`${this.apiUrl}asignarturno`, modelo);
  }
}
