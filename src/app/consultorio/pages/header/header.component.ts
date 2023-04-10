import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MenuItem } from 'primeng/api';
import { AsignarTurnoComponent } from '../asignar-turno/asignar-turno.component';

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

  agendarTurno() {
    this.dialog
      .open(AsignarTurnoComponent, {
        disableClose: false,
      })
      .afterClosed()
      .subscribe((resultado) => {
        if (resultado === 'creado') {
        }
      });
  }
}
