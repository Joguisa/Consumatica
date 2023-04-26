import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogsComponent } from '../components/dialogs/dialogs.component';
import { DialogDataModel } from '../components/models/dialog-data.model';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(private matDialog: MatDialog) {}

  abrirDialogo(data: DialogDataModel) {
    return this.matDialog.open(DialogsComponent, { data, disableClose: true });
  }
}
