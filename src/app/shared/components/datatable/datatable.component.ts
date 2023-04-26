import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

import { TableColumn } from '../models/table-column.model';
import { TableConfig } from '../models/table-config.model';
import { TableAction } from '../models/table-action.model';
import { TABLE_ACTION } from '../enums/table-action.enum';

@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.css'],
})
export class DatatableComponent implements OnInit, AfterViewInit {
  dataSource: MatTableDataSource<Array<any>> = new MatTableDataSource(); // preguntar si se deja así o se usa este nombre para todas las tablas o se usan las diferentes definiciones en los TS de cada tabla para dataSource

  displayedColumns: string[] = [];

  tableColumns: TableColumn[] = [];

  tableConfig: TableConfig | undefined;

  @Input() filterValue!: string;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @Input() set data(data: Array<any>) {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
  }

  @Input() set columns(columns: TableColumn[]) {
    this.tableColumns = columns;
    this.displayedColumns = this.tableColumns.map((col) => col.def);
  }

  @Input() set config(config: TableConfig) {
    this.setConfig(config);
  }

  @Output() action: EventEmitter<TableAction> = new EventEmitter();

  setConfig(config: TableConfig) {
    this.tableConfig = config;

    if (this.tableConfig.showActions) {
      this.displayedColumns.push('acciones');
    }
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.data);
    // this.displayedColumns = this.columns.map((column) => column.def);
  }

  editar(element: any) {
    this.action.emit({ action: TABLE_ACTION.EDIT, element });
  }

  eliminar(element: any) {
    this.action.emit({ action: TABLE_ACTION.DELETE, element });
  }
}
