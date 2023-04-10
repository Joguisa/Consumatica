import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { DialogPacienteComponent } from '../../modales/dialog-paciente/dialog-paciente.component';

import { UtilidadService } from 'src/app/shared/services/utilidad.service';
import { PacienteService } from '../../services/paciente.service';

import { Paciente } from '../../interfaces/paciente';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.css'],
})
export class PacienteComponent implements AfterViewInit, OnInit {
  columnasTabla: string[] = ['cedula', 'nombre', 'apellido', 'acciones'];
  dataInicio: Paciente[] = [];
  dataListaPacientes = new MatTableDataSource(this.dataInicio);

  @ViewChild(MatPaginator) paginacionTabla!: MatPaginator;
  constructor(
    public dialog: MatDialog,
    private _utilidadServicio: UtilidadService,
    private _pacientesService: PacienteService
  ) {}

  mostrarPacientes() {
    //Mostrar pacientes en la tabla
    this._pacientesService.getPaciente().subscribe({
      next: (data) => {
        if (data)
          //if(data.status) para verificar si existen registros
          this.dataListaPacientes.data = data; // data.value
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
  }

  ngAfterViewInit(): void {
    this.dataListaPacientes.paginator = this.paginacionTabla;
  }

  aplicarFiltroTabla(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataListaPacientes.filter = filterValue.trim().toLowerCase();
    if (this.dataListaPacientes.paginator) {
      this.dataListaPacientes.paginator.firstPage();
    }
    // Agregamos el siguiente código para filtrar por cédula
    const filterCedula = filterValue.trim().toLowerCase();
    this.dataListaPacientes.filterPredicate = (data, filter) => {
      const cedula = data.cedula.trim().toLowerCase();
      return cedula.includes(filter);
    };
    this.dataListaPacientes.filter = filterCedula;
  }

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

  eliminarPaciente(paciente: Paciente) {
    Swal.fire({
      title: '¿Desea eliminar el paciente?',
      text: paciente.cedula,
      icon: 'warning',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Si, eliminar',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      cancelButtonText: 'No, volver',
    }).then((resultado) => {
      if (resultado.isConfirmed) {
        this._pacientesService.deletePaciente(paciente.cedula).subscribe(
          () => {
            this._utilidadServicio.mostrarAlerta(
              'El paciente fue eliminado',
              ''
            );
            this.mostrarPacientes();
          },
          (error) => {
            this._utilidadServicio.mostrarAlerta(
              'Error al eliminar el paciente',
              ''
            );
          }
        );
        // this._pacientesService.deletePaciente(paciente.cedula).subscribe({
        //   next: (data) => {
        //     if (data) {
        //       this._utilidadServicio.mostrarAlerta(
        //         'El paciente fue eliminado',
        //         ''
        //       );
        //       this.mostrarPacientes();
        //     } else
        //       this._utilidadServicio.mostrarAlerta(
        //         'Error al eliminar el paciente',
        //         ''
        //       );
        //   },
        //   error: (e) => {},
        // });
      }
    });
  }
}
