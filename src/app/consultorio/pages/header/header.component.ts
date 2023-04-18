import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  items!: MenuItem[];

  constructor(public dialog: MatDialog) {}

  ngOnInit() {
    this.items = [
      {
        label: 'Inicio',
        routerLink: 'landing',
      },
      {
        label: 'Nosotros',
        routerLink: '#nosotros',
      },
      {
        label: 'Servicios',
        routerLink: '#servicios',
      },
      {
        label: 'Departamentos',
        routerLink: '#departamentos',
      },
      {
        label: 'Doctores',
        routerLink: '#doctores',
      },
      {
        label: 'Contáctanos',
        routerLink: '#contactanos',
      },
    ];
  }
}
