import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Dialog } from '../models/dialog.model';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  private $showDialog = new Subject<Dialog>();
  public showDialogObs = this.$showDialog.asObservable();
  constructor() { }

  public showDialog(dialog: Dialog) {
    this.$showDialog.next(dialog);
  }
}
