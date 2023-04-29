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
  mostrarLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _authService: AuthService,
    private _utilidadServicio: UtilidadService,
  ) {}

  formularioLogin: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(5)]]
  });
  
  ngOnInit(): void {}

  iniciarSesion() {
    const { email, password } = this.formularioLogin.value;
    this._authService.login(email, password).subscribe(
      (resp) => {
        this.mostrarLoading = true;
        if (resp) {
          this.loadSpinner();
        }
      },
      (error) => {
        console.error(error);
        this._utilidadServicio.mostrarAlerta(
          'No se encontraron coincidencias',
          'Opps!'
        );
        this.mostrarLoading = false;
        this.formularioLogin.reset();
      }
    );
  }

  loadSpinner() {
    this.mostrarLoading = true;
    setTimeout(() => {
      this.router.navigate(['/consultorio/empleado/empleado']);
    }, 1500);
  }
}
