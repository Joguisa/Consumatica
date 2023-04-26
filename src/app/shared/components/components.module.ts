import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogsComponent } from './dialogs/dialogs.component';
import { DatatableComponent } from './datatable/datatable.component';
import { MaterialModule } from '../material/material.module';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { SharedModule } from '../shared.module';
import { ButtonsComponent } from './buttons/buttons.component';
import { SearchComponent } from './search/search.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { FormularioComponent } from './formulario/formulario.component';

@NgModule({
  declarations: [
    DialogsComponent,
    DatatableComponent,
    ButtonsComponent,
    SearchComponent,
    ConfirmComponent,
    FormularioComponent,
  ],
  exports: [
    DialogsComponent,
    DatatableComponent,
    ButtonsComponent,
    SearchComponent,
    ConfirmComponent,
    FormularioComponent,
  ],
  imports: [CommonModule, MaterialModule, PrimeNgModule, SharedModule],
})
export class ComponentsModule {}
