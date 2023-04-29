import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

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
    this.router.navigate(['/auth/login']);
    this.authService.logout();
  }
}
