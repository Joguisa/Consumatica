import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilidadService } from 'src/app/shared/services/utilidad.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(
    private router: Router,
    private _utilidadServicio: UtilidadService
  ) {}
  ngOnInit(): void {}
  cerrarSesion() {
    this.router.navigate(['/auth/login']);
  }
}
