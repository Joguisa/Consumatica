import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogsComponent } from './dialogs/dialogs.component';
import { DatatableComponent } from './datatable/datatable.component';
import { MaterialModule } from '../material/material.module';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { SharedModule } from '../shared.module';
import { ButtonsComponent } from './buttons/buttons.component';

@NgModule({
  declarations: [DialogsComponent, DatatableComponent, ButtonsComponent],
  exports: [DialogsComponent, DatatableComponent, ButtonsComponent],
  imports: [CommonModule, MaterialModule, PrimeNgModule, SharedModule],
})
export class ComponentsModule {}
