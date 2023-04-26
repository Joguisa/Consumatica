import {
  AfterViewInit,
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { DialogPacienteComponent } from '../../modales/dialog-paciente/dialog-paciente.component';

import { UtilidadService } from 'src/app/shared/services/utilidad.service';
import { PacienteService } from '../../services/paciente.service';

import { Paciente } from '../../interfaces/paciente';

import Swal from 'sweetalert2';
import { TableColumn } from 'src/app/shared/components/models/table-column.model';
import { TableConfig } from 'src/app/shared/components/models/table-config.model';
import { TableAction } from 'src/app/shared/components/models/table-action.model';
import { TABLE_ACTION } from 'src/app/shared/components/enums/table-action.enum';
import { ConfirmService } from 'src/app/shared/services/confirm.service';
import { DialogService } from 'src/app/shared/services/dialog.service';

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.css'],
})
export class PacienteComponent implements OnInit {
  tableColumns: TableColumn[] = [];

  dataInicio: Paciente[] = [];
  dataListPaciente = new MatTableDataSource(this.dataInicio);

  tableConfig: TableConfig = {
    isPaginable: true,
    showActions: true,
  };

  setTableColumns() {
    this.tableColumns = [
      { label: 'Cedula', def: 'cedula', datakey: 'cedula' },
      { label: 'Nombre', def: 'nombre', datakey: 'nombres' },
      { label: 'Apellido', def: 'apellido', datakey: 'apellidos' },
    ];
  }

  // @ViewChild(MatPaginator) paginacionTabla!: MatPaginator;

  constructor(
    public dialog: MatDialog,
    private _utilidadServicio: UtilidadService,
    private _pacientesService: PacienteService,
    private _alertaServicio: ConfirmService,
    private _dialogServicio: DialogService
  ) {}

  mostrarPacientes() {
    //Mostrar pacientes en la tabla
    this._pacientesService.getPaciente().subscribe({
      next: (data) => {
        if (data)
          //if(data.status) para verificar si existen registros
          this.dataListPaciente.data = data; // data.value
        else
          this._utilidadServicio.mostrarAlerta(
            'No se encontraron datos',
            'Oops!'
          );
      },
      error: (e) => {},
    });
  }

  ngOnInit(): void {
    this.mostrarPacientes();
    this.setTableColumns();
  }

  // ngAfterViewInit(): void {
  //   this.dataListPaciente.paginator = this.paginacionTabla;
  // }

  aplicarFiltroTabla(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataListPaciente.filter = filterValue.trim().toLowerCase();
    if (this.dataListPaciente.paginator) {
      this.dataListPaciente.paginator.firstPage();
    }
    // Agregamos el siguiente código para filtrar por cédula
    const filterCedula = filterValue.trim().toLowerCase();
    this.dataListPaciente.filterPredicate = (data, filter) => {
      const cedula = data.cedula.trim().toLowerCase();
      return cedula.includes(filter);
    };
    this.dataListPaciente.filter = filterCedula;
  }

  // prueba(template: TemplateRef<any>) {
  //   this._dialogServicio
  //     .abrirDialogo({
  //       template,
  //     })
  //     .afterClosed()
  //     .subscribe((resultado) => {
  //       console.log(resultado);
  //       if (resultado === 'true') {
  //         this.mostrarPacientes();
  //       }
  //     });
  // }

  agregarPaciente() {
    this.dialog
      .open(DialogPacienteComponent, {
        disableClose: true,
      })
      .afterClosed()
      .subscribe((resultado) => {
        if (resultado === 'true') {
          this.mostrarPacientes();
        }
      });
  }
  editarPaciente(paciente: Paciente) {
    this.dialog
      .open(DialogPacienteComponent, {
        disableClose: true,
        data: paciente,
      })
      .afterClosed()
      .subscribe((resultado) => {
        if (resultado === 'true') {
          this.mostrarPacientes();
        }
      });
  }

  onTableAction(tableAction: TableAction) {
    switch (tableAction.action) {
      case TABLE_ACTION.EDIT:
        this.editarPaciente(tableAction.element);
        break;
      case TABLE_ACTION.DELETE:
        this.eliminarPaciente(tableAction.element);
        break;
    }
  }

  eliminarPaciente(paciente: Paciente) {
    this._alertaServicio
      .confirmDialog({
        title: '¿Está usted seguro?',
        message: 'Se eliminará el paciente: ',
        datos: paciente.apellidos,
        confirmText: 'Si, eliminar',
        cancelText: 'No, volver',
      })
      .subscribe((resultado) => {
        if (resultado) {
          this._pacientesService
            .deletePaciente(paciente.cedula)
            .subscribe(() => {
              this._utilidadServicio.mostrarAlerta(
                'El paciente fue eliminado',
                ''
              );
              this.mostrarPacientes();
            });
        } else {
          // this._utilidadServicio.mostrarAlerta(
          //   'El paciente no fue eliminado',
          //   ''
          // );
        }
      });
  }
}
