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
import { TableColumn } from 'src/app/shared/components/models/table-column.model';
import { TableConfig } from 'src/app/shared/components/models/table-config.model';
import { TableAction } from 'src/app/shared/components/models/table-action.model';
import { TABLE_ACTION } from 'src/app/shared/components/enums/table-action.enum';
import { ConfirmService } from 'src/app/shared/services/confirm.service';

@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.component.html',
  styleUrls: ['./empleado.component.css'],
})
export class EmpleadoComponent implements OnInit {
  tableColumns: TableColumn[] = [];
  tableConfig: TableConfig = {
    isPaginable: true,
    showActions: true,
  };
  dataInicio: Empleado[] = [];
  dataListEmpleado = new MatTableDataSource(this.dataInicio);

  setTableColumns() {
    this.tableColumns = [
      { label: 'Cedula', def: 'cedula', datakey: 'cedula' },
      { label: 'Nombre', def: 'nombre', datakey: 'nombres' },
      { label: 'Apellido', def: 'apellido', datakey: 'apellidos' },
      {
        label: 'Cargo',
        def: 'tipo',
        datakey: 'cargo',
      },
      {
        label: 'Servicio',
        def: 'servicio',
        datakey: 'nombreServicio',
      },
    ];
  }

  ngOnInit(): void {
    this.setTableColumns();
    this.mostrarEmpleados();
  }

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private _empleadoService: EmpleadoService,
    private _utilidadServicio: UtilidadService,
    private _dialogServicio: ConfirmService
  ) {}

  mostrarEmpleados() {
    this._empleadoService.getEmpleado().subscribe({
      next: (dataResponse) => {
        // this.dataSource.data = dataResponse;
        this.dataListEmpleado.data = dataResponse.map((empleado) => ({
          id: empleado.id,
          nombres: empleado.nombres,
          apellidos: empleado.apellidos,
          cedula: empleado.cedula,
          cargo: empleado.asignacion?.tipoEmpleado.nombreTipo,
          nombreServicio: empleado.servicio?.tipoServicio.nombreServicio,
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

  // eliminarEmpleado(idEmpleado: Empleado) {
  //   Swal.fire({
  //     title: '¿Desea eliminar el empleado?',
  //     text: idEmpleado.cedula,
  //     icon: 'warning',
  //     confirmButtonColor: '#3085d6',
  //     confirmButtonText: 'Si, eliminar',
  //     showCancelButton: true,
  //     cancelButtonColor: '#d33',
  //     cancelButtonText: 'No, volver',
  //   }).then((resultado) => {
  //     if (resultado.isConfirmed) {
  //       // console.log(idEmpleado);
  //       this._empleadoService
  //         .deleteEmpleado(idEmpleado.cedula)
  //         .subscribe(() => {
  //           this._utilidadServicio.mostrarAlerta(
  //             'El empelado fue eliminado',
  //             ''
  //           );
  //           this.mostrarEmpleados();
  //         });
  //     }
  //   });
  // }

  eliminarEmpleado(idEmpleado: Empleado) {
    this._dialogServicio
      .confirmDialog({
        title: '¿Está usted seguro?',
        message: 'Se eliminará el empleado: ',
        datos: idEmpleado.apellidos,
        confirmText: 'Si, eliminar',
        cancelText: 'No, volver',
      })
      .subscribe((resultado) => {
        if (resultado) {
          this._empleadoService
            .deleteEmpleado(idEmpleado.cedula)
            .subscribe(() => {
              this._utilidadServicio.mostrarAlerta(
                'El empleado fue eliminado',
                ''
              );
              this.mostrarEmpleados();
            });
        } else {
          // this._utilidadServicio.mostrarAlerta(
          //   'El empleado no fue eliminado',
          //   ''
          // );
        }
      });
  }

  onTableAction(tableAction: TableAction) {
    switch (tableAction.action) {
      case TABLE_ACTION.EDIT:
        this.editarEmpleado(tableAction.element);
        break;
      case TABLE_ACTION.DELETE:
        this.eliminarEmpleado(tableAction.element);
        break;
    }
  }

  aplicarFiltroTabla(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataListEmpleado.filter = filterValue.trim().toLowerCase();
    if (this.dataListEmpleado.paginator) {
      this.dataListEmpleado.paginator.firstPage();
    }
    // Agregamos el siguiente código para filtrar por cédula
    const filterCedula = filterValue.trim().toLowerCase();
    this.dataListEmpleado.filterPredicate = (data, filter) => {
      const cedula = data.cedula.trim().toLowerCase();
      return cedula.includes(filter);
    };
    this.dataListEmpleado.filter = filterCedula;
  }
}
