import { Component, OnInit } from '@angular/core';
import { Dialog, DialogElementType, DialogElement, DialogElementButton, DialogElementCheckBox, DialogElementText, DialogElementTextBox } from '../models/dialog.model';
import { DomSanitizer } from '@angular/platform-browser';
import { DialogService } from '../services/dialog.service';
import { InvalidOperationError } from 'src/app/models/invalid-operation-error';

@Component({
  selector: 'awd-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  private _sanitizer: DomSanitizer;
  private _dialogService: DialogService;
  public dialog: Dialog;
  public ElemType = DialogElementType;
  public showDialog: boolean;

  constructor(sanitizer: DomSanitizer, dialogService: DialogService) {
    this._sanitizer = sanitizer;
    this._dialogService = dialogService;
  }

  public cssVariablesStyle(elementCount: number) {
    return this._sanitizer.bypassSecurityTrustStyle(
      `--elementCount: ${elementCount};`);
  }

  public elemCheckbox(elem: DialogElement) {
    if (elem.type !== DialogElementType.CHECKBOX) {
      throw new InvalidOperationError('Could not interpret model as Checkbox');
    }
    return elem as DialogElementCheckBox;
  }
  public elemText(elem: DialogElement) {
    if (elem.type !== DialogElementType.TEXT) {
      throw new InvalidOperationError('Could not interpret model as Text');
    }
    return elem as DialogElementText;
  }
  public elemTextBox(elem: DialogElement) {
    if (elem.type !== DialogElementType.TEXTBOX) {
      throw new InvalidOperationError('Could not interpret model as Textbox');
    }
    return elem as DialogElementTextBox;
  }
  public elemButton(elem: DialogElement) {
    if (elem.type !== DialogElementType.BUTTON) {
      throw new InvalidOperationError('Could not interpret model as Button');
    }
    return elem as DialogElementButton;
  }

  public performAction(elem: DialogElementButton) {
    if (elem && elem.actionCallback) {
      elem.actionCallback();
    }
    if (elem.hideDialogOnAction) {
      this.showDialog = false;
    }
  }

  ngOnInit() {
    this._dialogService.showDialogObs.subscribe(x => {
      this.dialog = x;
      this.showDialog = true;
    });
  }

}
