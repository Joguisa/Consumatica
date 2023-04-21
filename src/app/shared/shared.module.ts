import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { PrimeNgModule } from './prime-ng/prime-ng.module';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
  declarations: [HomeComponent],
  exports: [HomeComponent],
  imports: [CommonModule, MaterialModule, PrimeNgModule],
})
export class SharedModule {}
