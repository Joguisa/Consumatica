import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Servicio } from '../../interfaces/servicio';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { UtilidadService } from 'src/app/shared/services/utilidad.service';
import { ServiciosService } from '../../services/servicios.service';
import { DialogServicioComponent } from '../../modales/dialog-servicio/dialog-servicio.component';

import Swal from 'sweetalert2';
import { TableColumn } from 'src/app/shared/components/models/table-column.model';
import { TableConfig } from 'src/app/shared/components/models/table-config.model';
import { TableAction } from 'src/app/shared/components/models/table-action.model';
import { TABLE_ACTION } from 'src/app/shared/components/enums/table-action.enum';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.css'],
})
export class ServiciosComponent implements OnInit {
  tableColumns: TableColumn[] = [];

  // columnasTabla: string[] = ['nombreServicio', 'acciones'];
  dataListServicio = new MatTableDataSource<Servicio>();
  tableConfig: TableConfig = {
    isPaginable: true,
    showActions: true,
  };

  setTableColumns() {
    this.tableColumns = [
      { label: 'Servicio', def: 'nombreServicio', datakey: 'nombreServicio' },
    ];
  }

  // @ViewChild(MatPaginator) paginacionTabla!: MatPaginator;

  constructor(
    public dialog: MatDialog,
    private _utilidadServicio: UtilidadService,
    private _serviciosServicio: ServiciosService
  ) {}

  mostrarServicios() {
    this._serviciosServicio.getServicios().subscribe({
      next: (data) => {
        if (data) {
          this.dataListServicio.data = data;
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
    this.mostrarServicios();
    this.setTableColumns();
  }

  // ngAfterViewInit(): void {
  //   this.dataListServicio.paginator = this.paginacionTabla;
  // }

  applyFilter(event: Event) {
    // const filterValue = (event.target as HTMLInputElement).value;
    // this.dataListaServicios.filter = filterValue.trim().toLowerCase();
    // if (this.dataListaServicios.paginator) {
    //   this.dataListaServicios.paginator.firstPage();
    // }
  }
  agregarServicio() {
    this.dialog
      .open(DialogServicioComponent, {
        disableClose: true,
      })
      .afterClosed()
      .subscribe((resultado) => {
        if (resultado === 'true') {
          this.mostrarServicios();
        }
      });
  }

  editarServicio(servicio: Servicio) {
    this.dialog
      .open(DialogServicioComponent, {
        disableClose: true,
        data: servicio,
      })
      .afterClosed()
      .subscribe((resultado) => {
        if (resultado === 'true') {
          this.mostrarServicios();
        }
      });
  }

  eliminarServicio(servicio: Servicio) {
    Swal.fire({
      title: '¿Desea eliminar el servicio?',
      text: servicio.nombreServicio,
      icon: 'warning',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Si, eliminar',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      cancelButtonText: 'No, volver',
    }).then((resultado) => {
      if (resultado.isConfirmed) {
        this._serviciosServicio.deleteServicio(servicio.id).subscribe(
          () => {
            this._utilidadServicio.mostrarAlerta(
              'El servicio fue eliminado',
              ''
            );
            this.mostrarServicios();
          },
          (error) => {
            this._utilidadServicio.mostrarAlerta(
              'Error al eliminar el servicio',
              ''
            );
          }
        );
      }
    });
  }

  onTableAction(tableAction: TableAction) {
    console.log(tableAction);
    switch (tableAction.action) {
      case TABLE_ACTION.EDIT:
        this.editarServicio(tableAction.element);
        break;
      case TABLE_ACTION.DELETE:
        this.eliminarServicio(tableAction.element);
        break;
    }
  }
}
