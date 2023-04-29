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
import { LoadingComponent } from './loading/loading.component';

@NgModule({
  declarations: [
    DialogsComponent,
    DatatableComponent,
    ButtonsComponent,
    SearchComponent,
    ConfirmComponent,
    FormularioComponent,
    LoadingComponent,
  ],
  exports: [
    DialogsComponent,
    DatatableComponent,
    ButtonsComponent,
    SearchComponent,
    ConfirmComponent,
    FormularioComponent,
    LoadingComponent
  ],
  imports: [CommonModule, MaterialModule, PrimeNgModule, SharedModule],
})
export class ComponentsModule {}
