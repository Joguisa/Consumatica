import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

import { Empleado } from '../../interfaces/empleado';

import { MatDialog } from '@angular/material/dialog';

import { EmpleadoService } from '../../services/empleado.service';
import { UtilidadService } from 'src/app/shared/services/utilidad.service';

// import * as XLSX from "xlsx"

import { DialogEmpleadoComponent } from '../../modales/dialog-empleado/dialog-empleado.component';

import { TableColumn } from 'src/app/shared/components/models/table-column.model';
import { TableConfig } from 'src/app/shared/components/models/table-config.model';
import { TableAction } from 'src/app/shared/components/models/table-action.model';
import { TABLE_ACTION } from 'src/app/shared/components/enums/table-action.enum';
import { ConfirmService } from 'src/app/shared/services/confirm.service';
import { ReporteService } from '../../../../shared/services/reporte.service';
import { ReportePdfService } from 'src/app/shared/services/reporte-pdf.service';

import { TipoEmpleado } from 'src/app/consultorio/tipo-empleado/interfaces/tipo-empleado';
import { Servicio } from 'src/app/consultorio/servicios/interfaces/servicio';


@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.component.html',
  styleUrls: ['./empleado.component.css'],
})
export class EmpleadoComponent implements OnInit  {
  tableColumns: TableColumn[] = [];
  tableConfig: TableConfig = {
    isPaginable: true,
    showActions: true,
  };
  dataInicio: Empleado[] = [];
  tipoServicios: Servicio[] = [];
  listaTipo: TipoEmpleado[] = [];
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
        nested: true,
      },
      {
        label: 'Servicio',
        def: 'servicio',
        datakey: 'nombreServicio',
        nested: true,
      },
    ];
  }

  ngOnInit(): void {
    this.setTableColumns();
    this.mostrarEmpleados();
  }

  constructor(
    public dialog: MatDialog,
    private _empleadoService: EmpleadoService,
    private _utilidadServicio: UtilidadService,
    private _dialogServicio: ConfirmService,
    private _reportServicio: ReporteService,
    private _reportPdfServicio: ReportePdfService
  ) {}

  mostrarEmpleados() {
    this._empleadoService.getEmpleado().subscribe({
      next: (dataResponse) => {
        this.dataListEmpleado.data = dataResponse.map((empleado) => ({
          id: empleado.id,
          nombres: empleado.nombres,
          apellidos: empleado.apellidos,
          cedula: empleado.cedula,
          cargo: empleado.asignacion?.tipoEmpleado.nombreTipo ?? '',
          nombreServicio: empleado.servicio?.tipoServicio.nombreServicio ?? '',          
          // nombreTipo: empleado.asignacion?.tipoEmpleado.nombreTipo,
          // nombreServicio: empleado.servicio?.tipoServicio.nombreServicio,
        }));        
      },
      error: (e) => {},
    });
  }

  // mostrarEmpleados() {
  //   this._empleadoService.getEmpleado().subscribe({
  //     next: (dataResponse) => {
  //       this.dataListEmpleado.data = dataResponse.map((empleado) => {
  //         return {
  //           id: empleado.id,
  //           nombres: empleado.nombres,
  //           apellidos: empleado.apellidos,
  //           cedula: empleado.cedula,
  //           asignacion: empleado.asignacion,
  //           servicio: empleado.servicio,
  //         }
  //       });
  //     },
  //     error: (e) => {},
  //   });
  // }
  


  exportarExcel(): void{
    this._reportServicio.exportToExcel(this.dataListEmpleado.data, 'Lista de empleados');
  }

  exportarPDF(){
    const encabezado = ['Cedula', 'Nombres', 'Apellidos', 'Cargo', 'Servicio'];
        const cuerpo = this.dataListEmpleado.data.map((empleado) => {
          return [
            empleado.cedula,
            empleado.nombres,
            empleado.apellidos,
            empleado.asignacion?.tipoEmpleado.nombreTipo,
            empleado.servicio?.tipoServicio.nombreServicio
          ]
        })
        console.log(cuerpo)
    this._reportPdfServicio.exportToPdf(encabezado, cuerpo, 'Listado de empleados', true)
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
          this._utilidadServicio.mostrarAlerta(
            'El empleado no fue eliminado',
            ''
          );
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

  
  
  aplicarFiltroTabla(filterValue: string) {
    this.dataListEmpleado.filter = filterValue.trim().toLowerCase();
    if (this.dataListEmpleado.paginator) {
      this.dataListEmpleado.paginator.firstPage();
    }
    // Agregamos el siguiente código para filtrar por cédula
    // const filterCedula = filterValue.trim().toLowerCase();
    // this.dataListEmpleado.filterPredicate = (data, filter) => {
    //   const cedula = data.cedula.trim().toLowerCase();
    //   return cedula.includes(filter);
    // };
    // this.dataListEmpleado.filter = filterCedula;
  }
}
