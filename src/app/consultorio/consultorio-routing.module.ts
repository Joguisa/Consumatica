import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import { EmpleadoComponent } from './pages/empleado/empleado.component';
import { PacienteComponent } from './pages/paciente/paciente.component';
import { HomeComponent } from './pages/home/home.component';
import { TipoEmpleadoComponent } from './pages/tipo-empleado/tipo-empleado.component';
import { ServiciosComponent } from './pages/servicios/servicios.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: 'landing', component: LandingComponent },
      { path: 'empleado', component: EmpleadoComponent },
      { path: 'paciente', component: PacienteComponent },
      { path: 'cargos', component: TipoEmpleadoComponent },
      { path: 'servicios', component: ServiciosComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConsultorioRoutingModule {}
