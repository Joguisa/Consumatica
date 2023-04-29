import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeSwitcherComponent } from './theme-switcher/theme-switcher.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../shared/material/material.module';



@NgModule({
  declarations: [ThemeSwitcherComponent],
  imports: [
    CommonModule, MaterialModule
  ],
  exports: [ThemeSwitcherComponent]
})
export class ThemeModule { }
