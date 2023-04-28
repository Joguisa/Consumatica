import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmpleadoRoutingModule } from './empleado-routing.module';

import { EmpleadoComponent } from './pages/empleado/empleado.component';
import { DialogEmpleadoComponent } from './modales/dialog-empleado/dialog-empleado.component';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { PrimeNgModule } from 'src/app/shared/prime-ng/prime-ng.module';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { ReporteService } from '../../shared/services/reporte.service';

@NgModule({
  declarations: [EmpleadoComponent, DialogEmpleadoComponent],
  exports: [EmpleadoComponent, DialogEmpleadoComponent],
  // providers: [ReporteService],
  imports: [
    CommonModule,
    EmpleadoRoutingModule,
    MaterialModule,
    PrimeNgModule,
    ComponentsModule,
  ],
})
export class EmpleadoModule {}
