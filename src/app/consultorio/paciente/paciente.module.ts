import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PacienteRoutingModule } from './paciente-routing.module';
import { PacienteComponent } from './pages/paciente/paciente.component';
import { DialogPacienteComponent } from './modales/dialog-paciente/dialog-paciente.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { PrimeNgModule } from 'src/app/shared/prime-ng/prime-ng.module';

@NgModule({
  declarations: [PacienteComponent, DialogPacienteComponent],
  exports: [PacienteComponent, DialogPacienteComponent],
  imports: [CommonModule, PacienteRoutingModule, MaterialModule, PrimeNgModule],
})
export class PacienteModule {}
