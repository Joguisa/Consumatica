import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TipoEmpleadoComponent } from './pages/tipo-empleado/tipo-empleado.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'tipo-empleado', component: TipoEmpleadoComponent },
      { path: '**', redirectTo: 'tipo-empleado' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TipoEmpleadoRoutingModule {}
