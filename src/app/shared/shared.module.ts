import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { PrimeNgModule } from './prime-ng/prime-ng.module';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from '../app-routing.module';
import { DialogsComponent } from './components/dialogs/dialogs.component';

@NgModule({
  declarations: [HomeComponent, DialogsComponent],
  exports: [HomeComponent],
  imports: [CommonModule, MaterialModule, PrimeNgModule, AppRoutingModule],
})
export class SharedModule {}
