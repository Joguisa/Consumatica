import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogsComponent } from './dialogs/dialogs.component';
import { DatatableComponent } from './datatable/datatable.component';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [DialogsComponent, DatatableComponent],
  exports: [DialogsComponent, DatatableComponent],
  imports: [CommonModule, MaterialModule],
})
export class ComponentsModule {}
