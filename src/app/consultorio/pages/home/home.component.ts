import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { UtilidadService } from 'src/app/shared/services/utilidad.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  public sidenavOpen = false;
  constructor(private authService: AuthService, private router: Router) {}
  ngOnInit(): void {
    this.router.events.subscribe(() => {
      this.sidenavOpen = false;
    });
  }
  cerrarSesion() {
    localStorage.removeItem('currentUser');
    this.authService.isLoggedIn = false;
    this.router.navigate(['/auth/login']);
  }
}
