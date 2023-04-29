import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { UtilidadService } from 'src/app/shared/services/utilidad.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  loading: boolean = false;
  mostrarLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _authService: AuthService,
    private _utilidadServicio: UtilidadService
  ) {}

  formularioRegister: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(5)]]
  });



  ngOnInit(): void {}

  crearCuenta() {
    this.mostrarLoading = true;
    console.log(this.formularioRegister.value)
    console.log(this.formularioRegister.valid)
  }

  loadSpinner() {
    this.mostrarLoading = true;
    setTimeout(() => {
      this.router.navigate(['/consultorio/empleado/empleado']);
    }, 1000);
  }

}
