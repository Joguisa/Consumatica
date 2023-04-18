import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

import { TipoEmpleado } from '../../interfaces/tipo-empleado';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';

import { UtilidadService } from 'src/app/shared/services/utilidad.service';
import { TipoEmpleadoService } from '../../services/tipo-empleado.service';

import { DialogTipoEmpleadoComponent } from '../../modales/dialog-tipo-empleado/dialog-tipo-empleado.component';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-tipo-empleado',
  templateUrl: './tipo-empleado.component.html',
  styleUrls: ['./tipo-empleado.component.css'],
})
export class TipoEmpleadoComponent implements AfterViewInit, OnInit {
  columnasTabla: string[] = ['nombreTipo', 'acciones'];
  dataInicio: TipoEmpleado[] = [];
  dataListaTipoEmpleados = new MatTableDataSource(this.dataInicio);

  @ViewChild(MatPaginator) paginacionTabla!: MatPaginator;

  constructor(
    public dialog: MatDialog,
    private _utilidadServicio: UtilidadService,
    private _serviciosTipoEmpleado: TipoEmpleadoService
  ) {}

  mostrarTipoEmpleado() {
    this._serviciosTipoEmpleado.getTipos().subscribe({
      next: (data) => {
        if (data) {
          this.dataListaTipoEmpleados.data = data;
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
  }

  ngAfterViewInit(): void {
    this.dataListaTipoEmpleados.paginator = this.paginacionTabla;
  }

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
    Swal.fire({
      title: '¿Desea eliminar el cargo?',
      text: tipoEmpleado.nombreTipo,
      icon: 'warning',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Si, eliminar',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      cancelButtonText: 'No, volver',
    }).then((resultado) => {
      if (resultado.isConfirmed) {
        this._serviciosTipoEmpleado.deleteTipos(tipoEmpleado.id).subscribe(
          () => {
            this._utilidadServicio.mostrarAlerta(
              'El tipo empleado fue eliminado',
              ''
            );
            this.mostrarTipoEmpleado();
          },
          (error) => {
            this._utilidadServicio.mostrarAlerta(
              'Error al eliminar el tipo empleado',
              ''
            );
          }
        );
      }
    });
  }
}
