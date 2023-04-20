import { Component, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Empleado } from 'src/app/consultorio/empleado/interfaces/empleado';
import { TableColumn } from '../models/table-column';
import { Paciente } from 'src/app/consultorio/paciente/interfaces/paciente';

@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.css'],
})
export class DatatableComponent {
  dataSource: any = []; // preguntar si se deja así o se usa este nombre para todas las tablas o se usan las diferentes definiciones en los TS de cada tabla para dataSource

  displayedColumns: string[] = [];

  tableColumns: TableColumn[] = [];

  @Input() set data(data: any) {
    this.dataSource = data;
  }

  @Input() set columns(columns: TableColumn[]) {
    this.tableColumns = columns;
    this.displayedColumns = this.tableColumns.map((col) => col.def);
  }

  editarEmpleado(empleado: Empleado) {}

  eliminarEmpleado(idEmpleado: Empleado) {}
}
