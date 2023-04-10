import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//modulos
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { MenubarModule } from 'primeng/menubar';
import { TableModule } from 'primeng/table';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  exports: [ButtonModule, MenubarModule, TableModule, ToolbarModule],
})
export class PrimeNgModule {}
