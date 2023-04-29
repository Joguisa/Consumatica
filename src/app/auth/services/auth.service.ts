import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Auth } from '../interfaces/auth';
import { Observable, catchError, map, tap, throwError } from 'rxjs';
import { Usuario } from '../interfaces/usuario';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  //cuentas/login
  private endPoint: string = environment.endPoint;
  private apiUrl: string = this.endPoint + 'api/';
  private _auth!: Auth;

  constructor(private http: HttpClient) {}

  get auth(){
    return { ...this._auth }
  }

  login(email: string, password: string) {
    const url = `${this.apiUrl}cuentas/login`
    const body = { email, password}
    return this.http.post<Auth>(url, body).pipe(
      tap(resp => this._auth = resp),
      tap(resp => {
        if(resp.token)
        {
          localStorage.setItem('token', resp.token);
        }
      }),
      map(resp => resp.token),
      catchError(error => {
        return throwError(() => error);
      })
    )
  }

  validarToken(): Observable<string> {
    const url = `${this.apiUrl}auth/renew`;
    const headers = new HttpHeaders().set('x-token', localStorage.getItem('token') || '');

    return this.http.get<Auth>(url, {headers}).pipe(
      map( resp => {
        return resp.token
      })
    )
  }

  logout(){
    localStorage.clear()
  }
}
