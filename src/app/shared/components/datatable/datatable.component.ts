import { Component, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Empleado } from 'src/app/consultorio/empleado/interfaces/empleado';
import { TableColumn } from '../models/table-column';

@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.css'],
})
export class DatatableComponent {
  dataListaEmpleado = new MatTableDataSource<Empleado>();
  displayedColumns: string[] = [];

  tableColumns: TableColumn[] = [];

  @Input() set data(data: any) {
    this.dataListaEmpleado = data;
  }
  @Input() set columns(columns: TableColumn[]) {
    this.tableColumns = columns;
    this.displayedColumns = this.tableColumns.map((col) => col.def);
  }

  editarEmpleado(empleado: Empleado) {}

  eliminarEmpleado(idEmpleado: Empleado) {}
}
