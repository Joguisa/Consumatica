import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogDataModel } from '../models/dialog-data.model';
import { FormControl, NgModel } from '@angular/forms';
import { SelectorChange } from '../models/selecto-change.model';
import { SelectorOption } from '../models/selector-option.model';

@Component({
  selector: 'app-dialogs',
  templateUrl: './dialogs.component.html',
  styleUrls: ['./dialogs.component.css'],
})
export class DialogsComponent {
  @Input() label: string = '';
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogDataModel) {}
}
