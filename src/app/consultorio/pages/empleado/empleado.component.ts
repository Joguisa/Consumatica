import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

import { Empleado } from '../../interfaces/empleado';

import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { EmpleadoService } from '../../services/empleado.service';
import { UtilidadService } from 'src/app/shared/services/utilidad.service';

import { DialogEmpleadoComponent } from '../../modales/dialog-empleado/dialog-empleado.component';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.component.html',
  styleUrls: ['./empleado.component.css'],
})
export class EmpleadoComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = [
    'cedula',
    'nombre',
    'apellido',
    'tipo',
    'acciones',
  ];
  dataSource = new MatTableDataSource<Empleado>();

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private _empleadoService: EmpleadoService,
    private _utilidadServicio: UtilidadService
  ) {}

  agregarEmpleado() {
    this.dialog
      .open(DialogEmpleadoComponent, {
        disableClose: true,
      })
      .afterClosed()
      .subscribe((resultado) => {
        if (resultado === 'creado') {
          this.mostrarEmpleados();
        }
      });
  }

  ngOnInit(): void {
    this.mostrarEmpleados();
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  mostrarEmpleados() {
    this._empleadoService.getEmpleado().subscribe({
      next: (dataResponse) => {
        // this.dataSource.data = dataResponse;
        this.dataSource.data = dataResponse.map((empleado) => ({
          id: empleado.id,
          nombres: empleado.nombres,
          apellidos: empleado.apellidos,
          cedula: empleado.cedula,
          cargo: empleado.asignacion?.tipoEmpleado.nombreTipo,
        }));
      },
      error: (e) => {},
    });
  }

  eliminarEmpleado(idEmpleado: Empleado) {
    Swal.fire({
      title: '¿Desea eliminar el empleado?',
      text: idEmpleado.cedula,
      icon: 'warning',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Si, eliminar',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      cancelButtonText: 'No, volver',
    }).then((resultado) => {
      if (resultado.isConfirmed) {
        console.log(idEmpleado);
        this._empleadoService
          .deleteEmpleado(idEmpleado.cedula)
          .subscribe(() => {
            this._utilidadServicio.mostrarAlerta(
              'El empelado fue eliminado',
              ''
            );
            this.mostrarEmpleados();
          });
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
    // Agregamos el siguiente código para filtrar por cédula
    const filterCedula = filterValue.trim().toLowerCase();
    this.dataSource.filterPredicate = (data, filter) => {
      const cedula = data.cedula.trim().toLowerCase();
      return cedula.includes(filter);
    };
    this.dataSource.filter = filterCedula;
  }

  exportPdf() {}

  exportExcel() {}
}
