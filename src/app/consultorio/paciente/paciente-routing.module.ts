import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PacienteComponent } from './pages/paciente/paciente.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'paciente', component: PacienteComponent },
      { path: '**', redirectTo: 'paciente' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PacienteRoutingModule {}
