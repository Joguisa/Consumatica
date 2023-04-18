import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';

//modulos
import { ConsultorioRoutingModule } from './pages-routing.module';
import { MaterialModule } from '../../shared/material/material.module';

//componentes

import { PrimeNgModule } from '../../shared/prime-ng/prime-ng.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { LandingComponent } from './landing/landing.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [LandingComponent, HeaderComponent, FooterComponent],
  exports: [LandingComponent, HeaderComponent, FooterComponent],
  imports: [
    CommonModule,
    ConsultorioRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    PrimeNgModule,
    SharedModule,
  ],
})
export class ConsultorioModule {}
