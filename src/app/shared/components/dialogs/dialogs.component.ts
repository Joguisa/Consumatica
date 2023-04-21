import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogDataModel } from '../models/dialog-data.model';

@Component({
  selector: 'app-dialogs',
  templateUrl: './dialogs.component.html',
  styleUrls: ['./dialogs.component.css'],
})
export class DialogsComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogDataModel) {}
}
