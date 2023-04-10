import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';

//modulos
import { ConsultorioRoutingModule } from './consultorio-routing.module';
import { MaterialModule } from '../material/material.module';

//componentes
import { LandingComponent } from './pages/landing/landing.component';
import { EmpleadoComponent } from './pages/empleado/empleado.component';
import { PacienteComponent } from './pages/paciente/paciente.component';
import { DialogEmpleadoComponent } from './modales/dialog-empleado/dialog-empleado.component';
import { DialogPacienteComponent } from './modales/dialog-paciente/dialog-paciente.component';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { HeaderComponent } from './pages/header/header.component';
import { FooterComponent } from './pages/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { TipoEmpleadoComponent } from './pages/tipo-empleado/tipo-empleado.component';
import { ServiciosComponent } from './pages/servicios/servicios.component';
import { DialogServicioComponent } from './modales/dialog-servicio/dialog-servicio.component';
import { DialogTipoEmpleadoComponent } from './modales/dialog-tipo-empleado/dialog-tipo-empleado.component';
import { AsignarTurnoComponent } from './pages/asignar-turno/asignar-turno.component';

@NgModule({
  declarations: [
    LandingComponent,
    EmpleadoComponent,
    PacienteComponent,
    DialogEmpleadoComponent,
    DialogPacienteComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    TipoEmpleadoComponent,
    ServiciosComponent,
    DialogServicioComponent,
    DialogTipoEmpleadoComponent,
    AsignarTurnoComponent,
  ],
  imports: [
    CommonModule,
    ConsultorioRoutingModule,
    MaterialModule,
    PrimeNgModule,
    ReactiveFormsModule,
  ],
})
export class ConsultorioModule {}
