import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PacienteRoutingModule } from './paciente-routing.module';
import { PacienteComponent } from './pages/paciente/paciente.component';
import { DialogPacienteComponent } from './modales/dialog-paciente/dialog-paciente.component';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { PrimeNgModule } from 'src/app/shared/prime-ng/prime-ng.module';
import { ComponentsModule } from 'src/app/shared/components/components.module';

@NgModule({
  declarations: [PacienteComponent, DialogPacienteComponent],
  exports: [PacienteComponent, DialogPacienteComponent],
  imports: [
    CommonModule,
    PacienteRoutingModule,
    MaterialModule,
    PrimeNgModule,
    ComponentsModule,
  ],
})
export class PacienteModule {}
