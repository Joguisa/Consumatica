import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TipoEmpleadoRoutingModule } from './tipo-empleado-routing.module';
import { DialogTipoEmpleadoComponent } from './modales/dialog-tipo-empleado/dialog-tipo-empleado.component';
import { TipoEmpleadoComponent } from './pages/tipo-empleado/tipo-empleado.component';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { PrimeNgModule } from 'src/app/shared/prime-ng/prime-ng.module';

@NgModule({
  declarations: [DialogTipoEmpleadoComponent, TipoEmpleadoComponent],
  exports: [DialogTipoEmpleadoComponent, TipoEmpleadoComponent],
  imports: [
    CommonModule,
    TipoEmpleadoRoutingModule,
    MaterialModule,
    PrimeNgModule,
  ],
})
export class TipoEmpleadoModule {}
