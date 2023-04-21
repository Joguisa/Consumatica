import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TABLE_ACTION } from '../enums/table-action.enum';
import { TableAction } from '../models/table-action.model';

@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.css'],
})
export class ButtonsComponent {
  @Input() nombreBoton!: string;
  @Input() colorBoton: 'primary' | 'warn' = 'primary';
  @Output() clickBoton = new EventEmitter<string>();

  onBotonClickeado(): void {
    this.clickBoton.emit();
  }
}
