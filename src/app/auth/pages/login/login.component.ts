import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UtilidadService } from 'src/app/shared/services/utilidad.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loading: boolean = false;
  formularioLogin!: FormGroup;
  mostrarLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _authService: AuthService,
    private _utilidadServicio: UtilidadService
  ) {}

  usuarioLogin = new FormGroup({
    usuario: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  ngOnInit(): void {}

  iniciarSesion() {
    // this.authServcice.login().subscribe(resp => {
    //   console.log(resp)
    // })

    this.mostrarLoading = true;
    if (
      this.usuarioLogin.value.usuario == 'jonatan' &&
      this.usuarioLogin.value.password == '12345'
    ) {
      this.loadSpinner();
    } else {
      this._utilidadServicio.mostrarAlerta(
        'No se encontraron coincidencias',
        'Opps!'
      );
      this.mostrarLoading = false;
      this.usuarioLogin.reset();
    }
  }

  loadSpinner() {
    this.mostrarLoading = true;
    setTimeout(() => {
      this.router.navigate(['/consultorio/empleado']);
    }, 1000);
  }
}
