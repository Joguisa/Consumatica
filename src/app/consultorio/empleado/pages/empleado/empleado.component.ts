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
import { TableColumn } from 'src/app/shared/components/models/table-column';

@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.component.html',
  styleUrls: ['./empleado.component.css'],
})
export class EmpleadoComponent implements AfterViewInit, OnInit {
  tableColumns: TableColumn[] = [];
  displayedColumns: string[] = [
    'cedula',
    'nombre',
    'apellido',
    'tipo',
    'servicio',
    'acciones',
  ];
  dataListaEmpleado = new MatTableDataSource<Empleado>();

  setTableColumns() {
    this.tableColumns = [
      { label: 'Cedula', def: 'cedula', datakey: 'cedula' },
      { label: 'Nombre', def: 'nombre', datakey: 'nombres' },
      { label: 'Apellido', def: 'apellido', datakey: 'apellidos' },
      { label: 'Cargo', def: 'tipo', datakey: 'cargo' },
      {
        label: 'Servicio',
        def: 'servicio',
        datakey: 'asistencia',
      },
      { label: 'Acciones', def: 'acciones', datakey: '' },
    ];
  }

  ngOnInit(): void {
    this.mostrarEmpleados();
    this.setTableColumns();
  }

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private _empleadoService: EmpleadoService,
    private _utilidadServicio: UtilidadService
  ) {}

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataListaEmpleado.paginator = this.paginator;
  }

  mostrarEmpleados() {
    this._empleadoService.getEmpleado().subscribe({
      next: (dataResponse) => {
        // this.dataSource.data = dataResponse;
        this.dataListaEmpleado.data = dataResponse.map((empleado) => ({
          id: empleado.id,
          nombres: empleado.nombres,
          apellidos: empleado.apellidos,
          cedula: empleado.cedula,
          cargo: empleado.asignacion?.tipoEmpleado.nombreTipo,
          asistencia: empleado.servicio?.tipoServicio.nombreServicio,
        }));
      },
      error: (e) => {},
    });
  }

  agregarEmpleado() {
    const dialogRef = this.dialog.open(DialogEmpleadoComponent, {
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((resultado) => {
      if (resultado === 'creado') {
        this.mostrarEmpleados();
      }
    });
  }

  editarEmpleado(empelado: Empleado) {
    const dialogRef = this.dialog.open(DialogEmpleadoComponent, {
      disableClose: true,
      data: empelado,
    });

    dialogRef.afterClosed().subscribe((resultado) => {
      if (resultado === 'creado') {
        this.mostrarEmpleados();
      }
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
        // console.log(idEmpleado);
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
    this.dataListaEmpleado.filter = filterValue.trim().toLowerCase();
    if (this.dataListaEmpleado.paginator) {
      this.dataListaEmpleado.paginator.firstPage();
    }
    // Agregamos el siguiente código para filtrar por cédula
    const filterCedula = filterValue.trim().toLowerCase();
    this.dataListaEmpleado.filterPredicate = (data, filter) => {
      const cedula = data.cedula.trim().toLowerCase();
      return cedula.includes(filter);
    };
    this.dataListaEmpleado.filter = filterCedula;
  }

  exportPdf() {}

  exportExcel() {}
}
