import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogsComponent } from './dialogs/dialogs.component';
import { DatatableComponent } from './datatable/datatable.component';
import { MaterialModule } from '../material/material.module';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { SharedModule } from '../shared.module';

@NgModule({
  declarations: [DialogsComponent, DatatableComponent],
  exports: [DialogsComponent, DatatableComponent],
  imports: [CommonModule, MaterialModule, PrimeNgModule, SharedModule],
})
export class ComponentsModule {}
