import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServiciosRoutingModule } from './servicios-routing.module';
import { ServiciosComponent } from './pages/servicios/servicios.component';
import { DialogServicioComponent } from './modales/dialog-servicio/dialog-servicio.component';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { PrimeNgModule } from 'src/app/shared/prime-ng/prime-ng.module';

@NgModule({
  declarations: [ServiciosComponent, DialogServicioComponent],
  exports: [ServiciosComponent, DialogServicioComponent],
  imports: [
    CommonModule,
    ServiciosRoutingModule,
    MaterialModule,
    PrimeNgModule,
  ],
})
export class ServiciosModule {}
