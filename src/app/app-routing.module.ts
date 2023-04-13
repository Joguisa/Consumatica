import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './consultorio/pages/landing/landing.component';
import { ErrorPageComponent } from './shared/error-page/error-page.component';
import { AuthGuard } from './auth/guard/auth.guard';
import { AsignarTurnoComponent } from './consultorio/pages/asignar-turno/asignar-turno.component';
import { HomeComponent } from './consultorio/pages/home/home.component';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'consultorio',
    loadChildren: () =>
      import('./consultorio/consultorio.module').then(
        (m) => m.ConsultorioModule
      ),
    // canLoad: [AuthGuard],
    // canActivate: [AuthGuard],
  },
  // {
  //   path: 'turno',
  //   component: AsignarTurnoComponent,
  // },

  {
    path: 'landing',
    component: LandingComponent,
  },
  {
    path: '404',
    component: ErrorPageComponent,
  },
  // {
  //   path: '**',
  //   redirectTo: '404',
  // },
  { path: '', pathMatch: 'full', redirectTo: '/landing' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
