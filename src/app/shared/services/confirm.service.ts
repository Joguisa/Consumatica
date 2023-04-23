import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogModel } from '../components/models/confirm-dialog.model';
import { ConfirmComponent } from '../components/confirm/confirm.component';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConfirmService {
  constructor(private dialog: MatDialog) {}

  confirmDialog(data: ConfirmDialogModel): Observable<boolean> {
    return this.dialog
      .open(ConfirmComponent, {
        data,
        width: '400px',
        disableClose: true,
      })
      .afterClosed();
  }
}
