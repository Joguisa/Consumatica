import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { PrimeNgModule } from './prime-ng/prime-ng.module';
import { HomeComponent } from './home/home.component';
import { ReporteService } from './services/reporte.service';
import { ThemeModule } from '../theme/theme.module';

@NgModule({
  declarations: [HomeComponent],
  exports: [HomeComponent],
  providers: [ReporteService],
  imports: [CommonModule, MaterialModule, PrimeNgModule, ThemeModule],
})
export class SharedModule {}
