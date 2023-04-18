import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpleadoComponent } from './pages/empleado/empleado.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'empleado', component: EmpleadoComponent },
      { path: '**', redirectTo: 'empleado' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmpleadoRoutingModule {}
