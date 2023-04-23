import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

import { TipoEmpleado } from '../../interfaces/tipo-empleado';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';

import { UtilidadService } from 'src/app/shared/services/utilidad.service';
import { TipoEmpleadoService } from '../../services/tipo-empleado.service';

import { DialogTipoEmpleadoComponent } from '../../modales/dialog-tipo-empleado/dialog-tipo-empleado.component';

import Swal from 'sweetalert2';
import { TableColumn } from 'src/app/shared/components/models/table-column.model';
import { TableConfig } from 'src/app/shared/components/models/table-config.model';
import { TableAction } from 'src/app/shared/components/models/table-action.model';
import { TABLE_ACTION } from 'src/app/shared/components/enums/table-action.enum';
import { ConfirmService } from 'src/app/shared/services/confirm.service';

@Component({
  selector: 'app-tipo-empleado',
  templateUrl: './tipo-empleado.component.html',
  styleUrls: ['./tipo-empleado.component.css'],
})
export class TipoEmpleadoComponent implements OnInit {
  tableColumns: TableColumn[] = [];
  // columnasTabla: string[] = ['nombreTipo', 'acciones'];
  dataInicio: TipoEmpleado[] = [];
  dataListTipo = new MatTableDataSource<TipoEmpleado>(this.dataInicio);
  tableConfig: TableConfig = {
    isPaginable: true,
    showActions: true,
  };

  setTableColumns() {
    this.tableColumns = [
      { label: 'Tipo Empleado', def: 'nombreTipo', datakey: 'nombreTipo' },
    ];
  }

  // @ViewChild(MatPaginator) paginacionTabla!: MatPaginator;

  constructor(
    public dialog: MatDialog,
    private _utilidadServicio: UtilidadService,
    private _serviciosTipoEmpleado: TipoEmpleadoService,
    private _dialogServicio: ConfirmService
  ) {}

  mostrarTipoEmpleado() {
    this._serviciosTipoEmpleado.getTipos().subscribe({
      next: (data) => {
        if (data) {
          this.dataListTipo.data = data;
        } else {
          this._utilidadServicio.mostrarAlerta(
            'No se encontraron datos',
            'Oops!'
          );
        }
      },
      error: (e) => {},
    });
  }

  ngOnInit(): void {
    this.mostrarTipoEmpleado();
    this.setTableColumns();
  }

  // ngAfterViewInit(): void {
  //   this.dataListTipo.paginator = this.paginacionTabla;
  // }

  applyFilter(event: Event) {
    // const filterValue = (event.target as HTMLInputElement).value;
    // this.dataListaServicios.filter = filterValue.trim().toLowerCase();
    // if (this.dataListaServicios.paginator) {
    //   this.dataListaServicios.paginator.firstPage();
    // }
  }

  agregarTipoEmpleado() {
    this.dialog
      .open(DialogTipoEmpleadoComponent, {
        disableClose: true,
      })
      .afterClosed()
      .subscribe((resultado) => {
        if (resultado === 'true') {
          this.mostrarTipoEmpleado();
        }
      });
  }

  editarTipoEmpleado(tipoEmpleado: TipoEmpleado) {
    this.dialog
      .open(DialogTipoEmpleadoComponent, {
        disableClose: true,
        data: tipoEmpleado,
      })
      .afterClosed()
      .subscribe((resultado) => {
        if (resultado === 'true') {
          this.mostrarTipoEmpleado();
        }
      });
  }

  eliminarTipoEmpleado(tipoEmpleado: TipoEmpleado) {
    this._dialogServicio
      .confirmDialog({
        title: '¿Esta usted seguro?',
        message: 'Se eliminará el cargo: ',
        datos: tipoEmpleado.nombreTipo,
        confirmText: 'Si, eliminar',
        cancelText: 'No, volver',
      })
      .subscribe((resultado) => {
        if (resultado) {
          this._serviciosTipoEmpleado
            .deleteTipos(tipoEmpleado.id)
            .subscribe(() => {
              this._utilidadServicio.mostrarAlerta(
                'El cargo fue eliminado',
                ''
              );
              this.mostrarTipoEmpleado();
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
    console.log(tableAction);
    switch (tableAction.action) {
      case TABLE_ACTION.EDIT:
        this.editarTipoEmpleado(tableAction.element);
        break;
      case TABLE_ACTION.DELETE:
        this.eliminarTipoEmpleado(tableAction.element);
        break;
    }
  }
}
