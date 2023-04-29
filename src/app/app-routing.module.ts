import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './consultorio/pages/landing/landing.component';
import { ErrorPageComponent } from './shared/error-page/error-page.component';
import { HomeComponent } from './shared/home/home.component';
import { AuthGuard } from './auth/guard/auth.guard';

const routes: Routes = [ 
  {
    path: 'landing',
    component: LandingComponent,
  },
  { path: '', pathMatch: 'full', redirectTo: 'landing' },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'consultorio',
    canActivate: [AuthGuard],
    
    component: HomeComponent,        
    children: [
      {
        path: 'empleado',
        canLoad: [AuthGuard],
        loadChildren: () =>
          import('./consultorio/empleado/empleado.module').then(
            (m) => m.EmpleadoModule
          ),
      },
      {
        path: 'paciente',
        canLoad: [AuthGuard],
        loadChildren: () =>
          import('./consultorio/paciente/paciente.module').then(
            (m) => m.PacienteModule
          ),
      },
      {
        path: 'servicios',
        loadChildren: () =>
          import('./consultorio/servicios/servicios.module').then(
            (m) => m.ServiciosModule
          ),
      },
      {
        path: 'tipo-empleado',
        loadChildren: () =>
          import('./consultorio/tipo-empleado/tipo-empleado.module').then(
            (m) => m.TipoEmpleadoModule
          ),
      },
    ],
  },
  {
    path:'ErrorPage', component: ErrorPageComponent 
  },
  {
    path: '**',
    redirectTo: 'ErrorPage',
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
